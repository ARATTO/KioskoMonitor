//-----------------------------------------------------------------------------
//Libreria para leer estatus de impresor Zebra TTP
//Basada en las especificaciones del fabricante
//Codificado  e implementado por Jose Luis Olivares, email: joseluiss_503@hotmail.com
//Version 1.0,    Junio 2017
//-----------------------------------------------------------------------------

//***Global Vars****
      var printerName="Zebra TTP 2030"; //Nombre del impresor instalado en el cliente
      var  clientIP=cliente.IP; //Ip del cliente a monitorear, leida desde seIPs.js
      var  ipAsID=clientIP.replace(/[.]/g,'');//usando ip sin puntos como identificador
      var  serverIP=servidor.IP; //leida desde setIps.js

      var prStatus=-1, strPrinterStatus=-1, prExtendedPrinterstatus=-1;
      var prDetectedErrorState=-1,strDetectedErrorstate=-1, prExtendedDetectedErrorState=-1, strExtendedDetectedErrorState=-1;
      var prLastErrorCode=-1,strLastErrorCode=-1, strErrorDescription=-1;

      var locator = new ActiveXObject ("WbemScripting.SWbemLocator");//solo en Iexplorer
      var service = locator.ConnectServer(".");

    //Varables SocketIO
	//server local: http://localhost:3000/
	//idClienteX=ipAsID;
	var socket = io.connect(serverIP,{query:'ipClienteX='+ipAsID}); //creating socket connection to server  'http://192.168.79.128:3000'
	//*******

var app={
	getClientIP:function(){
	      var properties2 = service.ExecQuery("SELECT * FROM Win32_NetworkAdapterConfiguration");
	      var e1 = new Enumerator (properties2);

	      for (;!e1.atEnd();e1.moveNext ())
	      {
	            var p1 = e1.item ();

	            if (p1.IPAddress!=null ) 
	                alert("IP: " + p1.IPAddress(0));

	      }

	},

	checkPrinterStatus:function(){
	      var properties = service.ExecQuery("SELECT * FROM Win32_Printer");
	      var e = new Enumerator (properties);//Este objeto solo es compatible con Internet Explorer, no con las aplicaciones de Tienda Windows 8.x.
	      var pos=1;
	      for (;!e.atEnd();e.moveNext())  //atEnd, item, moveNext solo es aplicable en Iexplorer
	      {
	            //elementPosition++;
	            var p = e.item ();

	            if (p.Default==true)       
	            {
		      		  printerName=p.caption;
		              prStatus=p.printerStatus;
		              prExtendedPrinterstatus=p.ExtendedPrinterStatus;
		              prDetectedErrorState=p.DetectedErrorState;
		              prExtendedDetectedErrorState=p.ExtendedDetectedErrorState;

		              //estado de error detectado 0, estado de error extendido 0, 

				    switch (prStatus) {
				        case 1: 
				          strPrinterStatus = "Other - Otro"; 
				          break;    //prExtendedPrinterstatus  = wbemObject.ExtendedPrinterStatus 
				        case 2: 
				          strPrinterStatus = "Unknown - Desconocido";
				          break; 
				        case 3: 
				          strPrinterStatus = "Idle - Sin Utilizar"; 
				          break;
				        case 4: 
				          strPrinterStatus = "Printing - Imprimiendo"; 
				          break;
				        case 5: 
				          strPrinterStatus = "Warmup - Calentando";
				          break; 
				        case 6: 
				          strPrinterStatus= "Stopped printing - Impresion detenida";
				          break; 
				        case 7: 
				          strPrinterStatus = "Offline - Fuera de Linea";
				          break;       
				     }   

				    switch(prDetectedErrorState){  
				        case 0: 
				            strDetectedErrorstate=" Unknown - Desconocido";
				            break; 
				        case 1: 
				            strDetectedErrorstate=" Other - Otro";
				            break; 
				        case 2: 
				            strDetectedErrorstate=" NoError";
				            break; 
				        case 3: 
				            strDetectedErrorstate=" Low Paper - Papel Bajo";
				            break; 
				        case 4: 
				            strDetectedErrorstate=" NoPaper - Sin Papel";
				            break; 
				        case 5: 
				            strDetectedErrorstate=" Low Toner - Papel Bajo ";
				            break; 
				        case 6: 
				            strDetectedErrorstate=" NoToner - Sin Toner";
				            break; 
				        case 7: 
				            strDetectedErrorstate=" Door Open - Puerta abierta";
				            break; 
				        case 8: 
				            strDetectedErrorstate=" Jammed - Atascado";
				            break; 
				        case 9: 
				            strDetectedErrorstate=" Offline - Fuera de Linea";
				            break; 
				        case 10: 
				            strDetectedErrorstate=" Service Requested - Requiere Servicio";
				            break; 
				        case 11: 
				            strDetectedErrorstate=" Output Bin Full - Papel en puerta de salida";
				            break;
				    }


				    switch (prExtendedDetectedErrorState){
				        case 0: 
				            strExtendedDetectedErrorState=" Unknown - Desconocido";
				            break; 
				        case 1: 
				            strExtendedDetectedErrorState=" Other - Otro";
				            break; 
				        case 2: 
				            strExtendedDetectedErrorState=" No Error";
				            break; 
				        case 3: 
				            strExtendedDetectedErrorState=" Low Paper -Papel Bajo";
				            break; 
				        case 4: 
				            strExtendedDetectedErrorState=" No Paper - Sin Papel";
				            break; 
				        case 5: 
				            strExtendedDetectedErrorState=" Low Toner - Papel Bajo";
				            break; 
				        case 6: 
				            strExtendedDetectedErrorState=" No Toner - Sin Toner";
				            break; 
				        case 7: 
				            strExtendedDetectedErrorState=" Door Open - Puerta abierta";
				            break; 
				        case 8: 
				            strExtendedDetectedErrorState=" Jammed - atascado";
				            break; 
				        case 9: 
				            strExtendedDetectedErrorState=" Service Requested - Requiere Servicio";
				            break; 
				        case 10: 
				            strExtendedDetectedErrorState=" Output Bin Full - Papel en puerta de salida";
				            break; 
				        case 11: 
				            strExtendedDetectedErrorState=" Paper Problem - Problema de Papel";
				            break; 
				        case 12: 
				            strExtendedDetectedErrorState=" Cannot Print Page - No se puede imprimir la pagina";
				            break; 
				        case 13: 
				            strExtendedDetectedErrorState=" User Intervantion Required - Requiere intervencion del Usuario";
				            break; 
				        case 14: 
				            strExtendedDetectedErrorState=" Out of Memory - Sin memoria";
				            break; 
				        case 15: 
				            strExtendedDetectedErrorState=" Server Unknown - Servidor desconocido"; 
				            break;
			    	}//end switch

			    }//End IF		

		            //alert('Corrida # '+pos);
		            pos++;


	      }//end For

	},

	showResults:function(){
		alert(printerName+' Printer Status: '+prStatus+' '+strPrinterStatus+'| Extended Prn Status: '+prExtendedPrinterstatus +'| Estado de error detectado:'+prDetectedErrorState+' '+strDetectedErrorstate+' |Estado de error extendido '+ prExtendedDetectedErrorState +' '+strExtendedDetectedErrorState +'| LastErrorCode= '+prLastErrorCode+' Error Desciption: '+strErrorDescription);
	},

	sendData: function(){
		var datos={ip:clientIP,ipID:ipAsID,printerName:printerName,prStatus:prStatus,prExtendedPrinterstatus:prExtendedPrinterstatus,prDetectedErrorState:prDetectedErrorState, prExtendedDetectedErrorState:prExtendedDetectedErrorState};
			
			socket.emit('ver_status',datos);
	}, 

    initialize: function() {
		"use strict";
		var self=this;
		//self.getClientIP();
		self.checkPrinterStatus(); //Leyendo estado del printer
		//self.showResults();
		self.sendData();
    
	}
};

//app.initialize();
function socket_enviar(){
	app.initialize();
};


var sendingData=setInterval(socket_enviar,7000);//enviando datos cada 7 seg, mejor cada 10