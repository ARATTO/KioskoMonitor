var express= require('express');
var session = require('express-session');//manejo sesiones
var app = express();
var http = require('http').Server(app);
var ping = require('ping'); //ping network
var io = require('socket.io')(http);

//--13/09/2017---
var router = express.Router(); //express4
//------------

//---08/09/2017
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
//----------

//--18/09/2017--- Sesiones
	app.use(session({secret: '7olivares77',resave:false, saveUninitialized: true}));
//-----

/* Linea original, server y pagina html a mostrar estan  en misma carpeta*/
//app.use(express.static(__dirname + '/public')); //serving statics files like css, js, images

var port=process.env.PORT || 3000; //this is for heroku

//---------------------------------
var mysql = require('mysql');

//port is optional
var pool= mysql.createPool({ //conexion a base de datos mysql  192.168.8.100
  host     : '10.3.5.148',
  user     : 'admin',
  password : 'admin85',
  insecureAuth: true, 
  database : 'dbmonitoreo'
});


// Define/initialize our global vars
	var socketCount = 0;
	var equiposConectados=[]; //guarda el listado de equipos conectados (guarda idIP)
	var equiposAlertados=[];
	var ipIdCliente=-1;
	var quitarIpId=-1, quitarIpIdPos=-1;
	var listEquipos='SELECT * FROM tblequipo'; //seleccionando las categorias disponibles
	var usersInfo=[];//guarda informacion del listado de usuarios
	var usuariosConectados=[];
	//var socketConnectedId=[]; //guarda socket e ipid del cliente, para comunicacion privada 19/10/2017 

	var sess; //variable que guarda las sesiones activas
//-------------------------------




router.get('/',requireLogin, function(req, res) {
	sess=req.session;
	res.sendFile(__dirname +'/public/index.html');		
});

router.get('/index.html',requireLogin, function(req, res) {
	sess=req.session;
	res.sendFile(__dirname +'/public/index.html');
});

router.route('/login')
    // show the form (GET http://localhost:8080/login)
    .get(function(req, res) {
    	res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    	res.sendFile(__dirname +'/public/login.html');
    })
    // process the form (POST http://localhost:8080/login)
    .post(function(req, res) {
    		sess = req.session;
    	  var post = req.body;
    	  var ssnIdusuario=sesionUsuario.buscar(usersInfo,post.loginUsuario,post.loginPassword);
		if(ssnIdusuario!==-1)//si existe el usuario y password
		{
			//usuariosConectados.push(post.loginUsuario,post.loginPassword);//agregando al array de ususarios conectados
			sess.username=post.loginUsuario;
			sess.userid=ssnIdusuario;
			res.redirect('/index.html');

		}else {
		    //res.send('Error de usuario o contrasena');
		    res.redirect('/login_error.html');
		  }

    });

   	router.get('/logout', function(req, res) {
  		req.session.destroy();
  		res.redirect('/login');
	});

   	router.get('/username', function(req, res) {
  		sess=req.session;
  		//res.send(JSON.stringify({ myUser: "olivares" }));
  		res.json({myUserName:sess.username,myUserId:sess.userid});
	});	



app.use('/',router);
app.use(express.static(__dirname + '/public'));//movido


/*app.use(function(req, res, next) {
	if(!req.session){
    	res.redirect('/login');	
    	//res.sendFile(__dirname +'/public/login.html');		
	}else{
		next();
		//res.sendFile(__dirname +'/public/index.html');	
	}
});*/

function requireLogin (req, res, next) {
	sess=req.session;
  if (!sess.username) {
    res.redirect('/login');
  } else {
    next();
  }
};

//Cargando listado de usuarios en memoria
	pool.getConnection(function(err, connection) { 
		var queryUsers="Select idusuario, userid, password from tblusuario";
		  // Use the connection
		  connection.query(queryUsers,function(err, rows) {
		  		if(err){
		  			console.log(err);
		  			return;
		  		}else{
		  			usersInfo=rows;//guardando en memoria el listado de usuarios de acceso
		  			console.log('Listado de usuarios cargados en memoria, total '+usersInfo.length);
		  		}
		      
		    	connection.release();// release connection
		      //Don't use the connection here, it has been returned to the pool.
		  });//cierra query
	});
//------------------------------------

var  sesionUsuario={buscar: function(arrayObjeto,myUser,myPass){			  	
		for(var p = 0; p < arrayObjeto.length; p++) {
		   if(arrayObjeto[p].userid===myUser.trim() && arrayObjeto[p].password===myPass.trim()) {
		     return arrayObjeto[p].idusuario;
		   }
		}

		return -1;//si no encuentra nada
    }};


io.on('connection', function(socket){
	ipIdCliente=socket.handshake.query['ipClienteX'];
	console.log('Cliente Conectado...'+ipIdCliente);
	//console.log('session id...'+socket.id);
	console.log('++++');

	if(typeof ipIdCliente !== 'undefined' &&  ipIdCliente!== null )//si el cliente envia el idIP
	{
			if(equiposConectados.indexOf(ipIdCliente)==-1)//si no esta en el array, lo agrega
			{
				equiposConectados.push(ipIdCliente);
				//socketConnectedId.push(socket.id); //agregando socket.id 19/10/17
			}

			console.log('Total clientes conectados: '+equiposConectados.length);		
			
	}



    socketCount++;// Socket has connected, increase socket count


	   //Cargando listado de equipo en gui del cliente de monitoreo
		pool.getConnection(function(err, connection) { 
			  // Use the connection
			  connection.query(listEquipos,function(err, rows) {
			  		if(err){
			  			console.log(err);
			  			return;
			  		}else{
			  			io.sockets.emit('mostrar_lstEquipos',rows);//emitiendo a todas las conecciones, si dentro del array rows hay una / genera conflictos con javascript
			  			console.log('Listado de equipos enviados a GUI de monitoreo!');
			  		}
			      
			    	connection.release();// release connection
			      //Don't use the connection here, it has been returned to the pool.
			  });//cierra query
		});


		socket.on('ver_status',function(equipo){//recibe datos de los equipos,desde cliente monitoreo
			console.log("IP Cliente: "+equipo.ip);
			console.log("IpId: "+equipo.ipID);
			console.log("Printer: "+equipo.printerName);
			console.log("Estado del Impresor: "+equipo.prStatus);
			console.log("Estado extendido  del Impresor: "+equipo.prExtendedPrinterstatus);				
			console.log("Error Detectado: "+equipo.prDetectedErrorState);
			console.log("Error Detectado Extendido: "+equipo.prExtendedDetectedErrorState);
			console.log(".......");	
			
			if(equiposConectados.indexOf(equipo.ipID)==-1)//si no esta en el array, lo agrega. 
			{
				equiposConectados.push(equipo.ipID);	//Si se esta afectando el performance, es posible quitar este bloque 
			}


			io.sockets.emit('latido_equipo_ok',equipo,equiposConectados.length);
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
							ipsOffLine[this.p].Respuesta=respuesta;	//agregando la repsuesta del ping 
							//io.sockets.emit('ping_ipResp',ipsOffLine);
							io.sockets.emit('ping_ipResp',ipsOffLine[this.p]);
						}.bind({p:p}));
					
					/*console.log("Respuesta = "+respuesta);
					console.log("################################################");
					console.log("IP: "+ipsOffLine[p].ip+" "+ipsOffLine[p].Respuesta);*/
				}


				//io.sockets.emit('ping_ipResp',ipsOffLine);
		});


    socket.on('disconnect', function () {
        socketCount--; // Decrease the socket count on a disconnect	       
        //io.sockets.emit('users connected', socketCount);    // Let all sockets know how many are connected
     	quitarIpId=socket.handshake.query['ipClienteX']; //ipId dele quipo desconectado
		if(typeof quitarIpId !== 'undefined' &&  quitarIpId!== null )//si el cliente envia el idIP
		{
        	quitarIpIdPos=equiposConectados.indexOf(quitarIpId); //posicion del equipo desconectado en el array
        	equiposConectados.splice(quitarIpIdPos,1); //quitando el ipid del array de equipos conectados
			//socketConnectedId.splice(quitarIpIdPos,1); //quitando socket.id 19/10/17

 			io.sockets.emit('conexion_cliente', equiposConectados.length);    // actualizamos el total de clientes conectados, 02/07/2017 11:35pm        		
		}
               
        io.sockets.emit('equipo_desconectado',socket.handshake.query['ipClienteX']);
        console.log("----");
        console.log('Cliente desconectado...'+socket.handshake.query['ipClienteX']);
        console.log('Total clientes conectados: '+equiposConectados.length);
        console.log("---");
    });

});


http.listen(port, function(){
  console.log('listening on *:'+port);
});