const express = require('express');
const morgan = require('morgan');
const bodyP = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
//-------------Encrypt, Jolivares ----------------------
const SimpleCrypto=require("simple-crypto-js").default;//password encrypt
const _secretKey=require('./lib/secret');
let simpleCrypto= new SimpleCrypto(_secretKey);
//-----------------------

let cron = require('node-cron');//task programming
let estado=require('./contadores');//manejando estado de equipos

const app = express();
////////////////////////////////////
//tablas
////////////////////////////////////
//configuracion
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs',exphbs({
	defaultLayout: 'main',
	layoutsDir: path.join(app.get('views'), 'layouts'),
	partialsDir: path.join(app.get('views'), 'partials'),
	extname: '.hbs',
	helpers: require('./lib/handlebars'),
}));
app.set('view engine', '.hbs');

////////////////////////////////////
//// Middlewares

///Comentar linea inferiror para Quitar mensajes DEV de consola
app.use(morgan('dev'));
//Sesiones
app.use(session({
	secret: 'gbmsv',
	resave:false, 
	saveUninitialized: true}
));
//Mansajes frontend
app.use(flash());

app.use(bodyP.urlencoded({extended: false}));
app.use(bodyP.json());


////////////////////////////////////
//// Global Variables


app.use((req, res, next)=>{
	app.locals.success = req.flash('success');
	next();
});


////////////////////////////////////
//// Routes
app.use(require('./routes'));
app.use('/kiosko', require('./routes/kiosko'));
app.use('/usuario',require('./routes/usuario'));
app.use('/logs',require('./routes/logs'));
////////////////////////////////////

var http = require('http').Server(app);
var ping = require('ping'); //ping network
var io = require('socket.io')(http);
var database=require('./public/js/setServerDb.js').dbServer;//importando modulo donde esta la ip del servidor de BD
//--13/09/2017---
var router = express.Router(); //express4
//------------

//---08/09/2017
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies
//----------


/* Linea original, server y pagina html a mostrar estan  en misma carpeta*/
//app.use(express.static(__dirname + '/public')); //serving statics files like css, js, images

var port=process.env.PORT || 3000; //this is for heroku

//---------------------------------
var mysql = require('mysql');

//port is optional
var pool= mysql.createPool({ //conexion a base de datos mysql  IP_MYSQL
  host     : database.host,
  user     : database.user,
  password : database.pass,
  insecureAuth: true, 
  database : database.db,
  port: database.port
});


// Define/initialize our global vars
	var socketCount = 0;
	var equiposConectados=[]; //guarda el listado de equipos conectados (guarda idIP)
	var equiposAlertados=[];
	var ipIdCliente=-1;
	var quitarIpId=-1, quitarIpIdPos=-1;
	var listEquipos='SELECT * FROM tblequipo WHERE estado=1 LIMIT 500'; //seleccionando todos los equipos habilitados
	var usersInfo=[];//guarda informacion del listado de usuarios
	var usuariosConectados=[];
	//var socketConnectedId=[]; //guarda socket e ipid del cliente, para comunicacion privada 19/10/2017 

	var sess; //variable que guarda las sesiones activas
//-------------------------------

//////////////////////

//////////////////////
//////////////////////

router.get('/',requireLogin, function(req, res) {
	sess=req.session;
	//18/09/2019 para corregir que se navegue hasta aqui sin estar logueado (Olivares)
	res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
	res.sendFile(__dirname +'/public/index.html');		
});

router.get('/index.html',requireLogin, function(req, res) {
	sess=req.session;
	//18/09/2019 para corregir que se navegue hasta aqui sin estar logueado (Olivares)
	res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');	
	res.sendFile(__dirname +'/public/index.html');
});

router.route('/login')
    // show the form (GET http://localhost:8080/login)
    .get(function(req, res) {
    	res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    	res.sendFile(__dirname +'/public/login.html');
    })
    // process the form (POST http://localhost:8080/login)
    .post(async function(req, res) {
			await refrescarUsuarios(); //refrescamos el listado de usuarios (para actualizar perfiles)
			sess = req.session;
    	  	var post = req.body;
		  	var userData=sesionUsuario.buscar(usersInfo,post.loginUsuario,post.loginPassword);
		  	//userData retornará -1 si no encuentra el usuario, de lo contrario retornará un objeto con data del usuario
		if(userData!==-1)//si existe el usuario y password
		{
			//usuariosConectados.push(post.loginUsuario,post.loginPassword);//agregando al array de ususarios conectados
			sess.username=post.loginUsuario;
			sess.email=userData.userMail;
			sess.idperfil=userData.userPerfil;
			sess.idusuario=userData.idUsuario; //agregamos el idususario 17/10/2019
			res.redirect('/index.html');

		}else {
		    //res.send('Error de usuario o contrasena');
		    res.redirect('/login_error.html');
		  }

    });

router.get('/logout', function(req, res) {
	req.session.destroy();//destruimos la sesion
	res.redirect('/login');
});

router.get('/username', function(req, res) {
	 sess=req.session;
	 //console.log(sess);
	res.json({myUserName:sess.username,myUserId:sess.email,myPerfil:sess.idperfil,myIdUsuario:sess.idusuario});
	
});	


app.use('/',router);
//app.use('/usuario',require(__dirname + '/public/templates/usuario'));
app.use(express.static(__dirname + '/public'));//movido


/////////////////////////////////
// MOTTO  v2
////// ///////////////////////////

function requireLogin (req, res, next) {
	sess=req.session;
	//console.log(req.session);
  if (!sess.username) {
    res.redirect('/login');
  } else {
    next();
  }
};


//---------------Cargando listado de usuarios en memoria------------------------
	pool.getConnection(function(err, connection) { 
		//console.log(pool);
		usersInfo.length=0; //borrando contenido
		//estado 0 significa borrado, 1 activo, 2 inactivo
		var queryUsers="Select idusuario, email, password, idPerfil,estado from tblusuario WHERE (estado <> 0 AND estado <> 2)";
		  // Use the connection
		  connection.query(queryUsers,async function(err, rows) {
		  		if(err){
		  			console.log(err);
		  			return;
		  		}else{
					 //await encryptOnDataBase(rows);//encripta passwords que ya estan en BD
					//usersInfo=rows;  
		  			usersInfo=await decryptPass(rows);//guardando en memoria el listado de usuarios de acceso
		  			console.log('Listado de usuarios cargados en memoria, total '+usersInfo.length);
				}
		      
		    	connection.release();// release connection
		      //Don't use the connection here, it has been returned to the pool.
		  });//cierra query
	});

	function refrescarUsuarios(){
		//usamos esta funcion para refrescar el valor de usersInfo, cuando se realizan cambios
		//en tblusuario                Jose Olivares, Sept 2019
		//estado 0 eliminado, 1 activo, 2 inactivo 
		pool.getConnection(function(err, connection) { 
			var queryUsers="SELECT idusuario, email, password, idPerfil, estado FROM tblusuario WHERE (estado <> 0 AND estado <> 2)";
			  // Use the connection
			  connection.query(queryUsers,async function(err, rows) {
					  if(err){
						  console.log(err);
						  return;
					  }else{
						  //usersInfo=rows;
						  usersInfo=await decryptPass(rows);//guardando en memoria el listado de usuarios de acceso
						  console.log('Listado de usuarios cargados en memoria, total '+usersInfo.length);
					  }
				  
					connection.release();// release connection
				  //Don't use the connection here, it has been returned to the pool.
			  });//cierra query
		});		
	}

	function decryptPass(rows){
		//desencriptando Password
		if(rows[0]){
			for (let i = 0; i < rows.length; i++) {	
				let pw=simpleCrypto.decrypt(rows[i].password);
				rows[i].password=pw;
			}
			return rows;
		}
		return {error:"Algo pasó al intentar cargar los usuarios, check index.js"}
	}

	async function encryptOnDataBase(registros){
		if (registros[0]) {
			for (let i = 0; i < registros.length; i++) {	
				let pw=simpleCrypto.encrypt(registros[i].password);
				await pool.query('UPDATE tblusuario SET password=? WHERE idusuario = ?', [pw, registros[i].idusuario]);
			}
		
		}
		console.log("*****ERROR en funcion encryptOnDataBase, index.js");
	}

var  sesionUsuario={buscar: function(arrayObjeto,myUser,myPass){			  	
		for(var p = 0; p < arrayObjeto.length; p++) {
		   if(arrayObjeto[p].email===myUser.trim() && arrayObjeto[p].password===myPass.trim()) {
			//19/09/2019 se modifico pqrq que retornara el email y el idPerfil del usuario
		    return {userMail:arrayObjeto[p].email,userPerfil:arrayObjeto[p].idPerfil,idUsuario:arrayObjeto[p].idusuario};
		   }
		}

		return -1;//si no encuentra nada
	}};
//--------------------------------------------------------	
	
//-----Tarea programada: borrado de logs todos los domingos del mes , 18 pm---
cron.schedule('0 18 * * sunday', () => {
	//pool se ejecuta bien, pero deberiamos revisar a futuro si se hace de forma tradicional ########################
	pool.query('DELETE FROM tblalertas_log WHERE fecha < DATE_SUB(NOW(), INTERVAL 3 MONTH)');
	console.log('Tarea programada ejecutada... Se ha eliminado el log de alertas posterior a 3 meses!');
  });
//--------------------------------

//----cargando todos los ipIDs de los equipos 11/10/2019		
function iniciarEstadosKioskos(){
	estado.setInitialState();//inicializando estados de equipos
	pool.query(listEquipos, function (error, results, fields) { //1 es activo, no eliminado
		if (error) throw error;
		//definiendo estados
		estado.setTotal(results.length);//total de equipos conectados
		estado.fillOffline(results);
		estado.fillDatosTblEquipo(results);
	  });	
}		

iniciarEstadosKioskos();

io.on('connection', function(socket){
	ipIdCliente=socket.handshake.query['ipClienteX'];
	//console.log('session id...'+socket.id);

	socketCount++;// Socket has connected, increase socket count

	console.log('++++');
	if(typeof ipIdCliente !== 'undefined' &&  ipIdCliente!== null )//si el cliente envia el ipID
	{
		console.log('Cliente Conectado...'+ipIdCliente);
		if(equiposConectados.indexOf(ipIdCliente)==-1)//si no esta en el array, lo agrega
		{
			equiposConectados.push(ipIdCliente);
			estado.addReady(ipIdCliente);//JL lo ponemos ready por default, hastq eu reporte status del printer
		}

		console.log('Total clientes conectados: '+equiposConectados.length);				
	}else{
		console.log("Cliente conectado a Interfaz de monitoreo, socket.id="+socket.id);	

		//cargados listado de equipos en GUI de monitoreo
		io.sockets.emit('mostrar_lstEquipos',estado.datosTblEquipo,estado.ready,estado.warning,estado.offline,equiposConectados.length);//emitiendo a todas las conecciones, si dentro del array rows hay una / genera conflictos con javascript
		
		console.log('Listado de equipos enviados a GUI de monitoreo!');			
	}

		socket.on('ver_status',function(equipo){//recibe datos de los equipos,desde cliente monitoreo
			console.log("IP Cliente: "+equipo.ip);
			console.log("IpId: "+equipo.ipID);
			console.log("Printer Name: "+equipo.printerName);
			console.log("Estado del Impresor: "+equipo.generalState);
			console.log("Estado (string): "+equipo.printerStatus);
			console.log("Estado extendido  del Impresor: "+equipo.extendedPrinterStatus);				
			console.log("Error Detectado: "+equipo.detectedErrorState);
			console.log("Error Detectado Extendido: "+equipo.extendedDetectedErrorState);
			console.log("¿Es printer Zebra?",equipo.esPrinterZebra);
			console.log(".......");	
			
			if(equiposConectados.indexOf(equipo.ipID)===-1)//si no esta en el array, lo agrega. 
			{
				equiposConectados.push(equipo.ipID);	//Si se esta afectando el performance, es posible quitar este bloque 
			}

			if(equipo.generalState==="Listo")//si no tiene alertas
			{
				estado.addReady(equipo.ipID);	
				//console.log("Estados ready: ", estado.ready);	
			}else{
				estado.addWarning(equipo.ipID);//si esta alertado
				//console.log("Estados warning: ", estado.warning);
			}

			io.sockets.emit('latido_equipo_ok',equipo,equiposConectados.length,estado.ready,estado.warning,estado.offline);
		});



	//agregado 09/11/2017 controlan la solicitud y envio de datos de hardware del cliente
		socket.on('ver_hwCliente',function(myIpID){
				//enviando peticion a todos los clientes, responderà quien tenga el ipID solicitado
				//console.log("Llama ver_hwCliente ipId="+myIpID);

				io.sockets.emit('ver_hwClienteData',myIpID);
		});

		socket.on('detalle_hwCliente',function (os,cpu,detMem,detDisk){

				//console.log(cpu.Nombre);
				io.sockets.emit('detalle_hwClienteShow',{os,cpu,detMem,detDisk});//enviandoa datos a interfaz de administraciòn index.html
		});
	//----------------
	//Haciendo ping a la IP
		var ipRes=false;
		function pinging_ip(host){
			var resp=false;
    		ping.promise.probe(host)
        	.then(function (res) {
        			otra(res);
        			//console.log(res.alive);
			})
        	.done();

        	return ipRes;
		};


		function otra(res){
			ipRes=res.alive;
		};
		

		socket.on('ping_ip',function(ipsOffLine){//28-12-2017 Modulo para hacer ping a IPs de equipos
				//haciendo ping para calidar si el equipo está encendido
				var respuesta=0;//no responde

				for (var p = 0; p <= ipsOffLine.length - 1; p++) {					
					    ping.sys.probe(ipsOffLine[p].ip.toString(), function(isAlive){ //ipsOffLine[p].ip.toString()
					    	
					    	if(isAlive){
        						respuesta=1;//responde
					    	}else{
        						respuesta=0;
        					}
							ipsOffLine[this.p].Respuesta=respuesta;	//agregando la respuesta del ping 
							
							io.sockets.emit('ping_ipResp',ipsOffLine[this.p]);
						}.bind({p:p}));
					
					/**/console.log("Respuesta = "+respuesta);
					console.log("################################################");
					console.log("IP: "+ipsOffLine[p].ip+" "+ipsOffLine[p].Respuesta);
				}


				//io.sockets.emit('ping_ipResp',ipsOffLine);
		});


		//Agregado 23/09/2019 Para registrar errores en log
		socket.on('registrar_log',function(equipo){
				console.log("**************************************************************");
				pool.getConnection(function(err, connection) { 
					var query=`INSERT INTO tblalertas_log (idequipo,descripcion)
					  VALUES ((SELECT idequipo FROM tblequipo WHERE ipID=?),?)`;
					var description=`Printer=${equipo.printerName} - generalState=${equipo.generalState} - printerStatus=${equipo.printerStatus} 
					- extendedPrinterStatus=${equipo.extendedPrinterStatus} - detectedError=${equipo.detectedErrorState} 
					- extendedDetectedError=${equipo.extendedDetectedError}`;
					  // Use the connection
					  connection.query(query,[equipo.ipID,description],async function(err, rows) {
							  if(err){
								  console.log(err);
								  return;
							  }else{
								  console.log('Se ha registrado un nuevo evento en el log, equipo: '+equipo.ip);
							  }
						  
							connection.release();// release connection
						  //Don't use the connection here, it has been returned to the pool.
					  });//cierra query
				});	
		});

	socket.on('refresh_lista_equipos', async function(){
		await iniciarEstadosKioskos();
		console.log("Se ejecutó iniciarEstadosKioskos");
	});

	

    socket.on('disconnect', function () {
        socketCount--; // Decrease the socket count on a disconnect	       
        //io.sockets.emit('users connected', socketCount);    // Let all sockets know how many are connected
     	quitarIpId=socket.handshake.query['ipClienteX']; //ipId del quipo desconectado
		if(typeof quitarIpId !== 'undefined' &&  quitarIpId!== null )//si el cliente envia el idIP
		{
			estado.addOffline(quitarIpId);//JL

			quitarIpIdPos=equiposConectados.indexOf(quitarIpId); //posicion del equipo desconectado en el array
        	equiposConectados.splice(quitarIpIdPos,1); //quitando el ipid del array de equipos conectados
			//socketConnectedId.splice(quitarIpIdPos,1); //quitando socket.id 19/10/17

 			io.sockets.emit('conexion_cliente', equiposConectados.length);    // actualizamos el total de clientes conectados, 02/07/2017 11:35pm        			
			registrarLogEquipo(quitarIpId, "Se perdió conexión con cliente de monitoreo");
		}
               
        io.sockets.emit('equipo_desconectado',quitarIpId, equiposConectados.length,estado.ready,estado.warning,estado.offline);
        console.log("----");
        console.log('Cliente desconectado...'+quitarIpId);
        console.log('Total clientes conectados: '+equiposConectados.length);
        console.log("---");
	});
	
	function registrarLogEquipo(equipoIpID, logDesc){
		if(equipoIpID>0 && logDesc!=='' && logDesc!==undefined && logDesc!==null){
			pool.getConnection(function(err, connection) { 
				var query=`INSERT INTO tblalertas_log (idequipo,descripcion)
				  VALUES ((SELECT idequipo FROM tblequipo WHERE ipID=?),?)`;
				  // Use the connection
				  connection.query(query,[equipoIpID,logDesc],async function(err, rows) {
						  if(err){
							  console.log(err);
							  return;
						  }else{
							  console.log('Se ha registrado un nuevo evento desconexion el log, equipo: '+equipoIpID);
						  }
					  
						connection.release();// release connection
					  //Don't use the connection here, it has been returned to the pool.
				  });//cierra query
			});	

		}

	}

});//cierra io.connection

/////Inicializando el servidor
http.listen(port, function(){
  console.log('listening on *:'+port);
});