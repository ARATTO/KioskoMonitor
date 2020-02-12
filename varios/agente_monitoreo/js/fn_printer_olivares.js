//Funciones para decodificar el estatus de los Impresores
//Autor: José Luis Olivares
//Email: joseluiss_503@hotmail.com
//Fecha: 23/09/2019
//Version 2.0

//Esta funcion se usara para impresores Zebra TTP2030 u otro modelo desconocido.

//motto
//10/2/2020
//modificacion de idioma y de biblioteca de estados y alertas


function evaluaEstadoPrinter(printerX){
	var generalState='Listo',strDetectedErrorstate='-1',strExtendedDetectedErrorState='-1';
    var strPrinterStatus='-1', strExtendedPrinterStatus='-1';

    switch (printerX.prStatus) {
        case 1: 
          strPrinterStatus = "Otro"; //Other  
          break;    //prExtendedPrinterstatus  = wbemObject.ExtendedPrinterStatus 
        case 2: 
          strPrinterStatus = "Desconocido"; //Unknown
          break; 
        case 3: 
          strPrinterStatus = "Sin Utilizar";//Idle  
          break;
        case 4: 
          strPrinterStatus = "Imprimiendo"; //Printing 
          break;
        case 5: 
          strPrinterStatus = "Calentando"; //Warmup
          break; 
        case 6: 
          strPrinterStatus= "Impresion detenida";//Stopped printing
          generalState='-1'; 
          break; 
        case 7: 
          strPrinterStatus = "Fuera de Linea"; //Offline
          generalState='-1'; 
          break;       
     }   

     switch (printerX.prExtendedPrinterstatus) { 
         //Status information for a printer that is different from information specified in the Availability property
        case 1: 
          strExtendedPrinterStatus = "Otro"; //Other  
          break;    
        case 2: 
          strExtendedPrinterStatus = "Desconocido"; //Unknown
          break; 
        case 3: 
          strExtendedPrinterStatus = "Sin Utilizar";//Idle  
          break;
        case 4: 
          strExtendedPrinterStatus = "Imprimiendo"; //Printing 
          break;
        case 5: 
          strExtendedPrinterStatus = "Calentando"; //Warmup
          break; 
        case 6: 
          strExtendedPrinterStatus= "Impresion detenida";//Stopped printing
          generalState='-1'; 
          break; 
        case 7: 
          strExtendedPrinterStatus = "Fuera de Linea"; //Offline 
          generalState='-1'; 
          break; 
        case 8: 
          strExtendedPrinterStatus = "Pausado"; //Paused 
          generalState='-1'; 
          break;
        case 9: 
          strExtendedPrinterStatus = "Error"; //Error
          generalState='-1'; 
          break; 
        case 10: 
          strExtendedPrinterStatus = "Ocupado"; //Busy
          generalState='-1'; 
          break; 
        case 11: 
          strExtendedPrinterStatus = "No disponible"; //Not available
          generalState='-1'; 
          break;
        case 12: 
          strExtendedPrinterStatus = "Esperando"; //Waiting
          break; 
        case 13: 
          strExtendedPrinterStatus = "Procesando"; //Processing
          break;
        case 14: 
          strExtendedPrinterStatus = "Inicializando"; //Initialization
          generalState='-1'; 
          break;                     
        case 15: 
          strExtendedPrinterStatus = "Ahorro de poder"; //Power Save
          break;            
        case 16: 
          strExtendedPrinterStatus = "Pendiente Borrar"; //Pending Deletion
          break;  
        case 17: 
          strExtendedPrinterStatus = "I/O Activo"; 
          break;   
        case 18: 
          strExtendedPrinterStatus = "Alimentación Manual"; //Manual Feed
          break;                    
     } 

    switch(printerX.prDetectedErrorState){  
        case 0: 
            strDetectedErrorstate="Listo para usar";  //Unknown
            break; 
        case 1: 
            strDetectedErrorstate="Otro";//Other
            break; 
        case 2: 
            strDetectedErrorstate= "Listo"; //No error
            break; 
        case 3: 
            strDetectedErrorstate="Papel Bajo"; //Low Paper
            generalState='-1'; 
            break; 
        case 4: 
            strDetectedErrorstate="Sin Papel"; //NoPaper 
            generalState='-1'; 
            break; 
        case 5: 
            strDetectedErrorstate="Papel bajo"; //Low Toner  -para zebra ttp2030 significa papel bajo
            generalState='-1'; 
            break; 
        case 6: 
            strDetectedErrorstate="Sin Papel"; //NoToner
            generalState='-1';
            break; 
        case 7: 
            strDetectedErrorstate="Puerta abierta";//Door Open - 
            generalState='-1';
            break; 
        case 8: 
            strDetectedErrorstate="Papel Atascado";  //Jammed -
            generalState='-1'; 
            break; 
        case 9: 
            strDetectedErrorstate="Fuera de Linea";//Offline -
            generalState='-1'; 
            break; 
        case 10: 
            strDetectedErrorstate="Requiere intervencion de usuario";//Service Requested 
            generalState='-1'; 
            break; 
        case 11: 
            strDetectedErrorstate="Papel en puerta de salida"; //Output Bin Full 
            generalState='-1'; 
            break;
    }

    switch (printerX.prExtendedDetectedErrorState){
        case 0: 
            strExtendedDetectedErrorState="Listo para usar";//Unknown -
            break; 
        case 1: 
            strExtendedDetectedErrorState="Otro"; // Other
            break; 
        case 2: 
            strExtendedDetectedErrorState="Listo"; //NoError
            break; 
        case 3: 
            strExtendedDetectedErrorState="Papel Bajo"; //Low Paper 
            generalState='-1'; 
            break; 
        case 4: 
            strExtendedDetectedErrorState="Sin Papel"; //No Paper
            generalState='-1'; 
            break; 
        case 5: 
            strExtendedDetectedErrorState="Papel Bajo";//Low Toner 
            generalState='-1'; 
            break; 
        case 6: 
            strExtendedDetectedErrorState="Sin Papel"; //No Toner
            generalState='-1';
            break; 
        case 7: 
            strExtendedDetectedErrorState="Puerta abierta"; //Door Open 
            generalState='-1';
            break; 
        case 8: 
            strExtendedDetectedErrorState="Atascado"; //Jammed 
            generalState='-1'; 
            break; 
        case 9: 
            strExtendedDetectedErrorState="Requiere atencion de usuario"; //Service Requested 
            generalState='-1'; 
            break; 
        case 10: 
            strExtendedDetectedErrorState="Papel en puerta de salida";//Output Bin Full 
            generalState='-1'; 
            break; 
        case 11: 
            strExtendedDetectedErrorState="Problema de Papel";//Paper Problem 
            generalState='-1'; 
            break; 
        case 12: 
            strExtendedDetectedErrorState="No se puede imprimir la pagina";//Cannot Print Page
            generalState='-1'; 
            break; 
        case 13: 
            strExtendedDetectedErrorState="Requiere intervencion del Usuario";//User Intervantion Required 
            generalState='-1'; 
            break; 
        case 14: 
            strExtendedDetectedErrorState="Sin memoria"; //Out of Memory 
            break; 
        case 15: 
            strExtendedDetectedErrorState="Servidor desconocido"; //Server Unknown 
            break;
	}//end switch

   if(printerX.prStatus){

   } 

   	/*if(printerX.prStatus!==7 && printerX.prDetectedErrorState===0){
		generalState="Listo";
    }*/
    
	return {generalState:generalState, printerStatus:strPrinterStatus,extendedPrinterStatus:strExtendedPrinterStatus, detectedErrorState:strDetectedErrorstate,extendedDetectedErrorState:strExtendedDetectedErrorState};
}

//11/10/2019  Verifica que el nombre del printer lleve la palabra Zebra
function esprinterZebra(defaultPrinterName){
  if(defaultPrinterName.indexOf('Zebra')!==-1 || defaultPrinterName.indexOf('zebra')!==-1 ){
    return true;
  }else{
    return false;
  }
}