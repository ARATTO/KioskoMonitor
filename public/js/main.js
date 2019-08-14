//-----------------------------------------------------------------------------
//Libreria para leer estatus de impresor Zebra TTP
//Basada en las especificaciones del fabricante
//Codificado  e implementado por Jose Luis Olivares, email: joseluiss_503@hotmail.com
//Version 1.0,    Junio 2017
//-----------------------------------------------------------------------------

//Global Vars***
var tplSource='', tplSource2='',tplSource3='',tplSource4='',tplSource5='';
var icono='<span id="icoKsk" class="glyphicon glyphicon-asterisk"></span>';	
var lstCompletoEquipos=[];  //listado completo de equipos, se mantendra siempr en memoria para no consultar la db muchas veces
var equiposAlertadosRT=[]; //listado de equipos alertados Real Time, se mantendra en la memoria del cliente de administracion
var equiposOkRT=[];//listado de equipos funcionando Ok Real Time, se mantendra en la memoria del cliente de administracion
var equiposOffLineRT=[]; //listado de equipos offline en real time
var quitarDeLista=-1; //idip del equipo a quitar del listado de equipos alertados
var estadoEquipoEvaluado=[];
var zebraPrinterDefault=-1, totDesconect=0;

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
		socket.on('latido_equipo_ok',function(equipo,totalClientes){//recibe los datos actuales del equipo

			if ($("#divTotalClientes").length > 0) {//si existe en el dom el DivTotalClientes
				$("#divTotalClientes").html(totalClientes);//actualizamos el total de clientes conectados
			}

			totDesconect=lstCompletoEquipos.length-totalClientes;

			if ($("#divOffline").length > 0) {//si existe en el dom el Div	
				$("#divOffline").html(totDesconect);//actualizamos el total de clientes desconectados
			}

	//----------13/08/2017
			if ($("#divTotalSinError").length > 0) {//si existe en el dom el Div	
				$("#divTotalSinError").html(totalClientes-equiposAlertadosRT.length);//actualizamos el total de equipos ready
			}
	//----------------

			estadoEquipoEvaluado=evaluaEstadoPrinter(equipo); //consultado los estados del printer
			zebraPrinterDefault=app.esPrinterZebra(equipo.printerName);//evalua si el printer por default es zebra

//--------------13/08/2017
			if(estadoEquipoEvaluado.status==="Listo" && zebraPrinterDefault===-1){
				estadoEquipoEvaluado.status="Listo, Otro Printer";
				estadoEquipoEvaluado.extendedDetectedErrorState="Default Printer no es Marca Zebra";
			}
//------------

			if ($('#divDetallePrinter').length > 0) {//si se cargo la interfaz de detalle del printer				
				$("#detalle"+equipo.ipID).attr("class", "glyphicon glyphicon-ok-circle alertaOk");//equipo responde por IP, cambiando icono en divdetalleEquipo a IP alertaOk
				$("#prnName"+equipo.ipID).html(equipo.printerName);
				$("#prnStatus"+equipo.ipID).html(estadoEquipoEvaluado.status);
				$("#prnError"+equipo.ipID).html(estadoEquipoEvaluado.detectedErrorState);
				$("#prnExtendedError"+equipo.ipID).html(estadoEquipoEvaluado.extendedDetectedErrorState);				

				if(zebraPrinterDefault===1){
					$("#prnImg"+equipo.ipID).attr("src", "img/zebra_ttp2000.png");//cambiando la imagen del printer	a zebra				
				}

				/*searchPrinterName=equipo.printerName;
				if(searchPrinterName.indexOf('Zebra')!==-1 || searchPrinterName.indexOf('zebra')!==-1 ){
					$("#prnImg"+equipo.ipID).attr("src", "img/zebra_ttp2000.png");//cambiando la imagen del printer
				}*/
			}
		

			if(estadoEquipoEvaluado.status==="Listo")//si no tiene alertas
			{
				$("#"+equipo.ipID).attr("class", "glyphicon glyphicon-ok-circle alertaOk");	//icono OK en panel nav izquierdo de equipos
				
				//DOM listado de quipos alarmados
				if($("#divLstAlarmados").length>0){//si esta cargado en el DOM
					$("#prnAlarma"+equipo.ipID).remove();//removemos la fila de la tabla
				}


				if($("#divDetallePrinter").length>0){
					$("#prnIco"+equipo.ipID).attr("class", "glyphicon glyphicon-ok-circle alertaOk");//cambiando icono OK en detalle printer
				}

//----------------------------------- 14/08/2017 no funciona, corregir
				if(app.buscarPosicion(equiposOkRT,equipo.ipID)===-1){//si no existe en lista de equipos sin alertas, lo agregamos
					equiposOkRT.push(equipo);//agregando al listado de equipos sin alertas

					var posUbicacion2=app.buscarPosicion(lstCompletoEquipos,equipo.ipID);					
					equiposOkRT[equiposOkRT.length-1].strUbicacion=lstCompletoEquipos[posUbicacion2].ubicacion; //agreagando propiedad strUbicacion
					equiposOkRT[equiposOkRT.length-1].strNombreEquipo=lstCompletoEquipos[posUbicacion2].nombre;//agregando propiedad strNombreEquipo															
					
					//alert("equiposOkRT.ipI="+equiposOkRT[equiposOkRT.length-1].ipID+" equiposOkRT.strNombreEquipo="+equiposOkRT[equiposOkRT.length-1].strNombreEquipo);
					//DOM listado de quipos sin alerats
					//equiposOkRT[equiposOkRT.length-1].strAlertaPrinter=estadoEquipoEvaluado.detectedErrorState; //anexando el string status al array de objetos equiposAlertadosRT;
					if($("#divLstEquiposOk").length>0){//si esta cargado en el DOM

						if($("#filaEquipoOk"+equipo.ipID).length<=0)//si no esta desplegado en pantalla 
						{				
						var lineaTabla2='<tr id="filaEquipoOk'+equipo.ipID+'"><td>'+getRowNumber("tblEquiposOk")+'</td><td>'+equipo.ip+'</td><td>'+lstCompletoEquipos[posUbicacion2].nombre+'</td><td>'+lstCompletoEquipos[posUbicacion2].ubicacion+'</td><td>'+estadoEquipoEvaluado.status+'</td></tr>';
						$("#tblEquiposOk tbody").append(lineaTabla2);//agregamos  la fila a la tabla
						}
					}	

				}

//-----------------------------------------------------
				quitarDeLista=app.buscarPosicion(equiposAlertadosRT,equipo.ipID);
				if(app.buscarPosicion(equiposAlertadosRT,equipo.ipID)!==-1){
					equiposAlertadosRT.splice(quitarDeLista,1);//quitando equipo de lista de warnings
					//alert("Quitando warning "+equipo.ipID);
				}			
			}


			if(estadoEquipoEvaluado.status!=="Listo"){
				$("#"+equipo.ipID).attr("class", "fa fa-exclamation-circle alertaW");	

				if($("#divDetallePrinter").length>0){
					$("#prnIco"+equipo.ipID).attr("class", "fa fa-exclamation-circle alertaW");//cambiando estado del printer en panel detalle	
				}


		//----------DOM listado de quipos sin alertas 11/08/2017
				if($("#divLstEquiposOk").length>0){//si esta cargado en el DOM
					$("#filaEquipoOk"+equipo.ipID).remove();//removemos la fila de la tabla de equipos sin alertas
				}
		//------------------------------------------------------------------
				
				if(app.buscarPosicion(equiposAlertadosRT,equipo.ipID)===-1){//si no existe en lista de equipos warning, lo agregamos
					equiposAlertadosRT.push(equipo);//agregando al listado de equipos alertados
						
						//DOM listado de quipos alermados
						equiposAlertadosRT[equiposAlertadosRT.length-1].strAlertaPrinter=estadoEquipoEvaluado.detectedErrorState; //anexando el string status al array de objetos equiposAlertadosRT;
						var posUbicacion=app.buscarPosicion(lstCompletoEquipos,equipo.ipID);
						equiposAlertadosRT[equiposAlertadosRT.length-1].strUbicacion=lstCompletoEquipos[posUbicacion].ubicacion;
						if($("#divLstAlarmados").length>0){//si esta cargado en el DOM	

							var lineaTabla='<tr id="prnAlarma'+equipo.ipID+'"><td>'+equipo.ip+'</td><td>'+lstCompletoEquipos[posUbicacion].ubicacion+'</td><td>'+estadoEquipoEvaluado.detectedErrorState+'</td></tr>';
						
							$("#tblEquiposAlertados tbody").append(lineaTabla);//agregamos  la fila a la tabla
						}	
								
				}
				
			}
			

			if ($("#divWarning").length > 0) {//si existe en el dom el Div	
					$("#divWarning").html(equiposAlertadosRT.length);//actualizamos el total de equipos connwarnings
				}

//--------------11/08/2017------------------------
				quitarDeLista=app.buscarPosicion(equiposOkRT,equipo.ipID);//quitando de lista de equios sin alertas
				if(app.buscarPosicion(equiposOkRT,equipo.ipID)!==-1){
					equiposOkRT.splice(quitarDeLista,1);//quitando equipo de lista de equipos ok
				}
//---------------------------------------------------

//-------leyendo detalle de hardware 09/11/2017 modificacion
	socket.on('detalle_hwClienteShow',function (data){//os,cpu,detMem,detDisk
			//alert("Sistema Operativo del cliente: "+os.Nombre);			
			//if ($('#divMostrarInventario').length > 0) {//Cargando datos
			    tplSource='';
				tplSource=$("#tpl-infoEquipo").html();
				$("#divInvEquipo").empty();//limpiando
				var tplInformacion=Handlebars.compile(tplSource);
				var html= tplInformacion(data); //compilando template cpu,dteMem,detDisk
		        $("#divInvEquipo").html(html); //cargando resultados
				//************************************7777777777777777777777777777777777777777****************************				
			//}//if
	});
//-------------------------------------

		});	//cierra receiveData	

		socket.on('conexion_cliente',function(totalClientes2){//si existe en el dom el DivTotalClientes
			if ($('#divTotalClientes').length > 0) {
				$('#divTotalClientes').html(totalClientes2.toString());
				//alert("Total Clientes: "+totalClientes2);
			}
		});
			//app.mostarStatusPrinter(equipo);


	    socket.on('mostrar_lstEquipos',function(rows){
	    	$("#lstKioskos").empty();//limpiaando zona de carga del listado de Kioskos
			lstCompletoEquipos=rows;//guardando listado de equipo en memoria
			equiposOffLineRT=rows;//por default tomo todos como desconectados
			if ($("#divOffline").length > 0) {//si existe en el dom el Div
				$("#divOffline").html(rows.length);//actualizamos el total de clientes desconectados
			}
		
	    	var cadena='';
	    	for (var i = 0; i < rows.length; i++) {
	    		var x=JSON.stringify(rows[i], null, 4);
	    	  	cadena='<li onClick=app.mostrarDatosEquipo('+i+'); > <a href="#"><div class="minitxt"><span id="'+rows[i].ipID+'" class="glyphicon glyphicon-ban-circle alertaE"></span>'+rows[i].ip+'<br> <p>'+rows[i].nombre+' '+ rows[i].ubicacion+'</p></div></a></li>';
	    	   $("#lstKioskos").append(cadena);//cargando contenido en index.html 
	    	}

	    	$("#recuentoTotal").html(rows.length);

	    });

		socket.on('equipo_desconectado',function(idIpEquipo){
			$("#"+idIpEquipo).attr("class", "glyphicon glyphicon-ban-circle alertaE");
			$("#detalle"+idIpEquipo).attr("class", "glyphicon glyphicon-ban-circle alertaE");//cambiando estado en panel detalle delequipo
			$("#prnIco"+idIpEquipo).attr("class", "glyphicon glyphicon-ban-circle alertaE");					
			
			//if ($("#divOffline").length > 0) {//si existe en el dom el Div
				totDesconect=totDesconect+1;	
				$("#divOffline").html(totDesconect);//actualizamos el total de clientes desconectados
			//}
		});

		socket.on('ping_ipResp',function(ipsOfflineResp){// 28-12-2017
			if ($('#divLstOffLine').length > 0)
			{	
				//for (var i = ipsOfflineResp.length - 1; i >= 0; i--) {

					if(ipsOfflineResp.Respuesta===1){//si la ip responde el ping
						$("#ipOff"+ipsOfflineResp.ipID).attr("class","fa fa-heartbeat alertaOk");
						$("#ipOff"+ipsOfflineResp.ipID).attr('title', 'Ping Responde');
						//$("#ipOff"+ipsOfflineResp[i].ipID).html('Responde');
					}else{
						//$("#ipOff"+ipsOfflineResp[i].ipID).html('No responde');
						$("#ipOff"+ipsOfflineResp.ipID).attr("class","fa fa-times-circle-o alertaE");	
						$("#ipOff"+ipsOfflineResp.ipID).attr('title', 'Ping No responde');											
					}						
				//}
			}
				
		});

	},

	mostrarDatosEquipo:function(posEquipo){
		$("#divContenido").empty();
	    tplSource='';

		tplSource=$("#tpl-detalleEquipo").html();
		var tplDetalleEquipo=Handlebars.compile(tplSource);
		app.showTemplate(tplDetalleEquipo,lstCompletoEquipos[posEquipo],"divContenido",0); //cargando template de tipo mensaje, param 0
	
		//19/10/2017solicitando detalle de hardware del cliente, se envia al servidor
		$("#divInvEquipo").html('<div class="text-center"> Cargando datos adicionales... <span class="fa fa-refresh fa-spin  fa-fw"></span></div>');
		socket.emit('ver_hwCliente',lstCompletoEquipos[posEquipo].ipID); 
	},

	mostarStatusPrinter:function(myPrinter){
		$("#divDetallePrinter").empty();	
		tplSource2="";
		tplSource2=$("#tpl-detallePrinter").html(); //creo que este tpl no existe, validar sino quitarlo
		var tplDetallePrinter=Handlebars.compile(tplSource2);
		app.showTemplate(tplDetallePrinter,myPrinter,"divDetallePrinter",0); //cargando template de tipo mensaje, param 0

	},

	mostrarEquiposAlertados:function(){
		$("#divContenido").empty();
	    tplSource3='';
		tplSource3=$("#tpl-equiposAlarmados").html();
		var tplEquiposAlarmados=Handlebars.compile(tplSource3);
		app.showTemplate(tplEquiposAlarmados,equiposAlertadosRT,"divContenido",1);
	},

	mostrarEquiposOffLine:function(){// creado 27-12-2017 Probar donde Cliente
		var posOff=-1;
	
		//si equipo esta en listado de equipos monitoreados, lo quitamos de la lista de desconectados
	/*	for (var i = equiposOkRT.length - 1; i >= 0; i--) {
			
			posOff=equiposOffLineRT.map(function(e) { return e.ipID; }).indexOf(equiposOkRT[i].ipID);

			if(posOff !== -1){
				equiposOffLineRT.splice(posOff,1);//quitando equipo del listado de offline
			}
		}

		for (var y = equiposAlertadosRT.length - 1; y >= 0; y--) {
			
			posOff=equiposOffLineRT.map(function(e) { return e.ipID; }).indexOf(equiposAlertadosRT[y].ipID);
			//alert("Encontrado en posicion: "+posOff);
			if(posOff != -1){
				equiposOffLineRT.splice(posOff,1);//quitando equipo del listado de offline, si solo esta alertado
			}
		}*/

		socket.emit('ping_ip',equiposOffLineRT);//consultando PING de IPS
		$("#divContenido").empty();
	    tplSource5='';
		tplSource5=$("#tpl-equiposOffLine").html();
		var tplEquiposOffLine=Handlebars.compile(tplSource5);
		app.showTemplate(tplEquiposOffLine,equiposOffLineRT,"divContenido",1);
	},	

	mostrarEquiposOk:function(){
		$("#divContenido").empty();
	    tplSource4='';
		tplSource4=$("#tpl-equiposOk").html();
		var tplEquiposOk=Handlebars.compile(tplSource4);
		app.showTemplate(tplEquiposOk,equiposOkRT,"divContenido",1);
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

    buscarPosicion:function(arrayObjeto,criterioBusqueda){			  	
		for(var p = 0; p < arrayObjeto.length; p++) {
		   if(arrayObjeto[p].ipID === criterioBusqueda) {
		     return p;
		   }
		}

		return -1;//si no encuentra nada

	},
	
	///////////////////////////////////////
	//motto
	

	///////////////////////////////////////

    initialize: function() {
		"use strict";
		var self=this;
		self.receiveData();
	}
};

app.initialize();