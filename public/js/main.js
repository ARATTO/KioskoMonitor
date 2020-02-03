//-----------------------------------------------------------------------------
//Libreria para leer estatus de impresor Zebra TTP
//Basada en las especificaciones del fabricante
//Codificado  e implementado por Jose Luis Olivares, email: joseluiss_503@hotmail.com
//Version 1.0,  Junio 2017
//version 2.0, 	Septiembre 2019
//-----------------------------------------------------------------------------

//Global Vars***
let tplSource='', tplSource2='',tplSource3='',tplSource4='',tplSource5='';
let icono='<span id="icoKsk" class="glyphicon glyphicon-asterisk"></span>';	
let lstCompletoEquipos=[];  //listado completo de equipos, se mantendra siempr en memoria para no consultar la db muchas veces
let equiposAlertadosRT=[]; //listado de equipos alertados Real Time, se mantendra en la memoria del cliente de administracion
let equiposOkRT=[];//listado de equipos funcionando Ok Real Time, se mantendra en la memoria del cliente de administracion
let equiposOffLineRT=[]; //listado de equipos offline en real time
let quitarDeLista=-1; //idip del equipo a quitar del listado de equipos alertados
let estadoEquipoEvaluado={};


let  listosIpId=[],alertadosIpId=[],offlineIpId=[]; //solo guardan los ipID

//Handlebars Helpers
	Handlebars.registerHelper('myDateTime',function(){
		var fecha=new Date();
		return fecha.toLocaleString();
	});

	Handlebars.registerHelper('leerErrorCode',function(codigo){
		var str=leerConfManagerErrorCode(codigo); //esta funcion vive en /js/LeerCodigoError?olivares.js
		return str;
	});
	Handlebars.registerHelper('indiceMas1',function(ind){
		return ind+1;
	});	
//----------

//--15.01.2018 funcion que cuenta el numero de filas de una tabla html jquery
	function getRowNumber(nombTabla){
		var numFilas=$("#"+nombTabla+" >tbody >tr").length;
		return numFilas+1;
	};
//------

//Varables SocketIO, colocar la IP estatica y el puerto del servidor Node.js
var socket = io.connect(servidor.IP); //creating socket connection to server, servidor.IP se lee desde setServerIp.js

var app={
	receiveData:function(){

		socket.on('mostrar_lstEquipos',function(rows,ready,warning,offline,totConectados){
	    	$("#lstKioskos").empty();//limpiando zona de carga del listado de Kioskos
			lstCompletoEquipos=Array.from(rows);//CLONAMOS listado de equipo en memoria
			//equiposOffLineRT=Array.from(rows);// CLONAMOS por default tomo todos como desconectados

			let totEquipos=lstCompletoEquipos.length;

			actualizarTablero(totConectados,ready.length,warning.length,offline.length);
		
	    	var cadena='';
	    	for (var i = 0; i < rows.length; i++) {		
	    	  	cadena='<li onClick=app.mostrarDatosEquipo('+i+'); > <a href="#"><div class="minitxt"><span id="'+rows[i].ipID+'" class="glyphicon glyphicon-ban-circle alertaE"></span>'+rows[i].ip+'<br> <p>'+rows[i].nombre+' '+ rows[i].ubicacion+'</p></div></a></li>';
	    	   $("#lstKioskos").append(cadena);//cargando contenido en index.html 
	    	}
			
			$("#recuentoTotal").html(totEquipos);//badge
			

			actualizarEstadosLocales(ready,warning,offline);

			asignarRegistrosPorEstado();

	    });

		socket.on('latido_equipo_ok',function(equipo,totalClientes,ready,warning,offline){//recibe los datos actuales del equipo
			
			actualizarTablero(totalClientes,ready.length,warning.length,offline.length);

			estadoEquipoEvaluado=equipo; //Para no alterar el resto del codigo, se hizo esta asignacion

			if ($('#divDetallePrinter').length > 0) {//si se cargo la interfaz de detalle del printer				
				$("#detalle"+equipo.ipID).attr("class", "glyphicon glyphicon-ok-circle alertaOk");//equipo responde por IP, cambiando icono en divdetalleEquipo a IP alertaOk
				$("#prnName"+equipo.ipID).html(equipo.printerName);

				if(estadoEquipoEvaluado.generalState==='-1'){ //para no mostrar -1 cuando tenga error REVISAR CREO QUE NO ENTRA AL TRUE
					$("#prnStatus"+equipo.ipID).html(estadoEquipoEvaluado.printerStatus.toString());
				}else{
					$("#prnStatus"+equipo.ipID).html(estadoEquipoEvaluado.generalState);
				}
				
				$("#prnError"+equipo.ipID).html(estadoEquipoEvaluado.detectedErrorState);
				$("#prnExtendedError"+equipo.ipID).html(estadoEquipoEvaluado.extendedDetectedErrorState);	
				$("#prnDescription"+equipo.ipID).html(estadoEquipoEvaluado.extendedPrinterStatus);				

				if(equipo.esPrinterZebra===true){
					$("#prnImg"+equipo.ipID).attr("src", "img/zebra_ttp2000.png");//cambiando la imagen del printer	a zebra				
				}else{
					$("#prnImg"+equipo.ipID).attr("src", "img/printer_generic.png");//imagen printer no zebra	
				}
			}//fin detalle printer
		
			if(estadoEquipoEvaluado.generalState==="Listo")//si no tiene alertas
			{
				$("#"+equipo.ipID).attr("class", "glyphicon glyphicon-ok-circle alertaOk");	//icono OK en panel nav izquierdo de equipos
				
				if($("#divDetallePrinter").length>0){
					$("#prnIco"+equipo.ipID).attr("class", "glyphicon glyphicon-ok-circle alertaOk");//cambiando icono OK en detalle printer
				}
		
			}//cierra IF ==="Listo"


			if(estadoEquipoEvaluado.generalState!=="Listo"){
				$("#"+equipo.ipID).attr("class", "fa fa-exclamation-circle alertaW");	

				if($("#divDetallePrinter").length>0){
					$("#prnIco"+equipo.ipID).attr("class", "fa fa-exclamation-circle alertaW");//cambiando estado del printer en panel detalle	
				}
			}//cierra If !==Listo
		

			actualizarEstadosLocales(ready,warning,offline);
			asignarRegistrosPorEstado();

		});	//cierra Latido_equipo_ok

		//-------leyendo detalle de hardware 09/11/2017 modificacion
		socket.on('detalle_hwClienteShow',function (data){//os,cpu,detMem,detDisk
			//alert("Sistema Operativo del cliente: "+os.Nombre);			
			if ($('#divDetalleEquipo').length > 0) {//si esta cargada la vista divDetalleEquipo
				tplSource='';
				tplSource=$("#tpl-infoEquipo").html();
				$("#divInvEquipo").empty();//limpiando
				var tplInformacion=Handlebars.compile(tplSource);
				var html= tplInformacion(data); //compilando template cpu,dteMem,detDisk
				$("#divInvEquipo").html(html); //cargando resultados	
			}//if
		});
		//-------------------------------------		
		

		socket.on('conexion_cliente',function(totalClientes2){//si existe en el dom el DivTotalClientes
			if ($('#divTotalClientes').length > 0) {
				$('#divTotalClientes').html(totalClientes2.toString());
			}
		});

		socket.on('equipo_desconectado',function(idIpEquipo, totConectados, ready,warning,offline){
			$("#"+idIpEquipo).attr("class", "glyphicon glyphicon-ban-circle alertaE");
			$("#detalle"+idIpEquipo).attr("class", "glyphicon glyphicon-ban-circle alertaE");//cambiando estado en panel detalle delequipo
			$("#prnIco"+idIpEquipo).attr("class", "glyphicon glyphicon-ban-circle alertaE");					
			
			actualizarTablero(totConectados,ready.length,warning.length,offline.length);

			actualizarEstadosLocales(ready,warning,offline);
			asignarRegistrosPorEstado();

		});

		socket.on('ping_ipResp', function(ipsOfflineResp){// 28-12-2017
			//NOTA: Esta funcion deberá utiliarse al constatr el PING de una IP
			//dados los cambios actuales de la V2, por el momento no haace nada
			if (ipsOfflineResp.Respuesta!==1) {//si no responde ping

			}else{
				let posOff=-1;		
				//si equipo esta en listado de equipos monitoreados, lo quitamos de la lista de offline
				/*posOff=equiposOffLineRT.map(function(e) { return e.ipID; }).indexOf(ipsOfflineResp.ipID);
				if(posOff !== -1){//si lo encuentra
					equiposOffLineRT.splice(posOff,1);//quitando equipo del listado de offline
				}
				*/									
			}			
		});

	}, //cierre receive_data

	mostrarDatosEquipo:function(posEquipo){
		$("#divContenido").empty();
	    tplSource='';

		tplSource=$("#tpl-detalleEquipo").html();
		var tplDetalleEquipo=Handlebars.compile(tplSource);
		app.showTemplate(tplDetalleEquipo,lstCompletoEquipos[posEquipo],"divContenido",0); //cargando template de tipo mensaje, param 0
	
		//mostramos un spinner mientras carga
		$("#divInvEquipo").html('<div class="text-center txt-claro"> Cargando datos adicionales... <span class="fa fa-refresh fa-spin  fa-fw"></span></div>');
		//solicitando detalle de hardware del cliente, se envia al servidor
		socket.emit('ver_hwCliente',lstCompletoEquipos[posEquipo].ipID); 
	},

	mostrarEquiposAlertados:function(){
		$("#divContenido").empty();
	    tplSource3='';
		tplSource3=$("#tpl-equiposAlarmados").html();
		var tplEquiposAlarmados=Handlebars.compile(tplSource3);
		app.showTemplate(tplEquiposAlarmados,equiposAlertadosRT,"divContenido",1);	

		let totReadyx=listosIpId.length;
		let totWarn=alertadosIpId.length;
		let totOff=offlineIpId.length;
		let totConn=totReadyx+totWarn;

		actualizarTablero(totConn,totReadyx,totWarn,totOff);//JL

	},

	mostrarEquiposOffLine: async function(){// creado 27-12-2017 Probar donde Cliente			
		$("#divContenido").empty();
		tplSource5='';
		tplSource5=$("#tpl-equiposOffLine").html();
		var tplEquiposOffLine=Handlebars.compile(tplSource5);
		app.showTemplate(tplEquiposOffLine,equiposOffLineRT,"divContenido",1);


		socket.emit('ping_ip',equiposOffLineRT);//consultando PING de IPS	

		//spining
		//$("#refreshOffline").removeClass("fa fa-refresh");
		$("#refreshOffline").addClass("fa-spin fa-fw");

		setTimeout(()=>{
			$("#refreshOffline").removeClass("fa-spin fa-fw");
			//$("#refreshOffline").addClass("fa fa-refresh");
		},1000);	

		let totReadyx=listosIpId.length;
		let totWarn=alertadosIpId.length;
		let totOff=offlineIpId.length;
		let totConn=totReadyx+totWarn;

		actualizarTablero(totConn,totReadyx,totWarn,totOff);//JL

	},

	mostrarEquiposOk:function(){
		$("#divContenido").empty();
	    tplSource4='';
		tplSource4=$("#tpl-equiposOk").html();
		var tplEquiposOk=Handlebars.compile(tplSource4);
		app.showTemplate(tplEquiposOk,equiposOkRT,"divContenido",1);

		let totReadyx=listosIpId.length;
		let totWarn=alertadosIpId.length;
		let totOff=offlineIpId.length;
		let totConn=totReadyx+totWarn;

		actualizarTablero(totConn,totReadyx,totWarn,totOff);//JL
	},

	esPrinterZebra:function(defaultPrinterName){
		if(defaultPrinterName.indexOf('Zebra')!==-1 || defaultPrinterName.indexOf('zebra')!==-1 ){
			return 1;
		}else{
			return -1;
		}
	},

	showTemplate: function (template,data,target,hasRows){ //showing templates with handlebars
		"use strict";
		 var html= template(data); //compilando template
        $("#"+target).html(html); //cargando resultados
	},
	
    buscarPosicion:function(arrayObjeto,criterioBusquedaIpID){			  	
		for(var p = 0; p < arrayObjeto.length; p++) {
		   if(arrayObjeto[p].ipID === criterioBusquedaIpID) {
		     return p;
		   }
		}

		return -1;//si no encuentra nada
	},
	
	validarPerfil:function(idperfil){
		if (idperfil===1||idperfil===2) {//root o admin
			$("#adminItem1").html('<a href="/usuario/verusuarios"><i class="fa fa-users"></i> USUARIOS</a>');
			$("#adminItem2").html('<a href="/kiosko/verkioskos"><i class="fa fa-desktop"></i> KIOSKOS</a>');
			$("#generalItem1").html('<a href="/logs/verlogkioskos"><i class="fa fa-history"></i> LOG ALERTAS</a>');
		}else{
			$("#adminItem1").html('');
			$("#adminItem2").html('');
			$("#generalItem1").html('<a href="/logs/verlogkioskos"><i class="fa fa-history"></i> LOG ALERTAS</a>');
		}
	},

	refrescarListaEquipos:function(){
		socket.emit('refresh_lista_equipos');//solicitamos al server actualiza la lista de equipos	
		//alert("refrescando lstEquipos");
	},

	getLoggedUserMail:function(){
		if($("#spnUserId").length>0){
			let loggedUserMail=$("#spnUserId").text();
			return loggedUserMail.trim();
		}		
		return -1;
	},

    initialize: function() {
		"use strict";
		var self=this;
		self.receiveData();
	}
};

app.initialize();



//12/10/2019 NEW  Olivares
function actualizarTablero(totConected,totReady,totWarning,totOffline){
	if($("#divTotalClientes").length>0){
		$("#divTotalClientes").empty();
		$("#divTotalClientes").html(totConected);
	}

	if ($("#divOffline").length > 0) {//si existe en el dom el Div
		$("#divOffline").empty();
		$("#divOffline").html(totOffline);//actualizamos el total de clientes desconectados
	}

	if($("#divWarning").length>0){
		$("#divWarning").empty();
		$("#divWarning").html(totWarning);
	}

	if($("#divTotalSinError").length>0){
		$("#divTotalSinError").empty();
		$("#divTotalSinError").html(totReady);
	}
}

 function actualizarEstadosLocales(arrayReady, arrayWarning, arrayOffline){
	try {
		listosIpId=Array.from(arrayReady);
		alertadosIpId=Array.from(arrayWarning);
		offlineIpId=Array.from(arrayOffline);	
	} catch (error) {
		console.log("Error en función actualizarEstadosLocales();");
		console.log(error);
	}

}


function asignarRegistrosPorEstado(){
	//limpiando contenido
	equiposOkRT.length=0;
	equiposOffLineRT.length=0;
	equiposAlertadosRT.length=0;
 
	//llenando arrays con data completa 
	for (let i = 0; i < listosIpId.length; i++) {//equiposOkRT
		let pos=lstCompletoEquipos.map(function(elemento) { return elemento.ipID; }).indexOf(listosIpId[i]);
		if(pos!==-1){
			equiposOkRT.push(lstCompletoEquipos[pos]);
			equiposOkRT[equiposOkRT.length-1].indiceLista=pos;//guardando el indice de la posicion en lstCompleto 
		}
	}

	for (let i = 0; i < alertadosIpId.length; i++) {//equiposAlertadosRT
		let pos2=lstCompletoEquipos.map(function(elemento) { return elemento.ipID; }).indexOf(alertadosIpId[i]);
		if(pos2!==-1){
			equiposAlertadosRT.push(lstCompletoEquipos[pos2]);
			equiposAlertadosRT[equiposAlertadosRT.length-1].indiceLista=pos2;
		}
	}

	for (let i = 0; i < offlineIpId.length; i++) {//equiposOffLineRT
		let pos3=lstCompletoEquipos.map(function(elemento) { return elemento.ipID; }).indexOf(offlineIpId[i]);
		if(pos3!==-1){
			equiposOffLineRT.push(lstCompletoEquipos[pos3]);
			equiposOffLineRT[equiposOffLineRT.length-1].indiceLista=pos3;
		}
	}	
	
	let totReady = equiposOkRT.length;
	let totWarning = equiposAlertadosRT.length;
	let totOffline = equiposOffLineRT.length;
	let totConected = totReady + totWarning;

	actualizarTablero(totConected,totReady,totWarning,totOffline);

	//console.log('ok',equiposOkRT);
	//console.log('alert',equiposAlertadosRT);
	//console.log('off',equiposOffLineRT);

	//console.log('tablero_OK', listosIpId);
	//console.log('tablero_WAR',alertadosIpId);
	//console.log('tablero_OFF', offlineIpId);
}


