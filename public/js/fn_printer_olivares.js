//Funciones para decodificar el estatus de los Impresores
//Autor: José Luis Olivares
//Email: joseluiss_503@hotmail.com
//Fecha: 23/09/2019
//Version 2.0

//Esta funcion se usara para impresores Zebra TTP2030 u otro modelo desconocido.

function evaluaEstadoPrinter(printerX){
	var generalState='Listo',strDetectedErrorstate='-1',strExtendedDetectedErrorState='-1';
    var strPrinterStatus='-1', strExtendedPrinterStatus='-1';

    switch (printerX.prStatus) {
        case 1: 
          strPrinterStatus = "Other (Otro)"; //Other  
          break;    //prExtendedPrinterstatus  = wbemObject.ExtendedPrinterStatus 
        case 2: 
          strPrinterStatus = "Unknown (Desconocido)"; //Unknown
          break; 
        case 3: 
          strPrinterStatus = "Idle (Sin Utilizar)";//Idle  
          break;
        case 4: 
          strPrinterStatus = "Printing (Imprimiendo)"; //Printing 
          break;
        case 5: 
          strPrinterStatus = "Warmup (Calentando)"; //Warmup
          break; 
        case 6: 
          strPrinterStatus= "Stopped printing (Impresion detenida)";//Stopped printing
          generalState='-1'; 
          break; 
        case 7: 
          strPrinterStatus = "Offline (Fuera de Linea)"; //Offline
          generalState='-1'; 
          break;       
     }   

     switch (printerX.prExtendedPrinterstatus) { 
         //Status information for a printer that is different from information specified in the Availability property
        case 1: 
          strExtendedPrinterStatus = "Other (Otro)"; //Other  
          break;    
        case 2: 
          strExtendedPrinterStatus = "Unknown (Desconocido)"; //Unknown
          break; 
        case 3: 
          strExtendedPrinterStatus = "Idle (Sin Utilizar)";//Idle  
          break;
        case 4: 
          strExtendedPrinterStatus = "Printing (Imprimiendo)"; //Printing 
          break;
        case 5: 
          strExtendedPrinterStatus = "Warmingup (Calentando)"; //Warmup
          break; 
        case 6: 
          strExtendedPrinterStatus= "Stopped printing (Impresion detenida)";//Stopped printing
          generalState='-1'; 
          break; 
        case 7: 
          strExtendedPrinterStatus = "Offline (Fuera de Linea)"; //Offline 
          generalState='-1'; 
          break; 
        case 8: 
          strExtendedPrinterStatus = "Paused (Pausado)"; //Paused 
          generalState='-1'; 
          break;
        case 9: 
          strExtendedPrinterStatus = "Error (Error)"; 
          generalState='-1'; 
          break; 
        case 10: 
          strExtendedPrinterStatus = "Busy (Ocupado)"; 
          generalState='-1'; 
          break; 
        case 11: 
          strExtendedPrinterStatus = "Not Available (No disponible)"; 
          generalState='-1'; 
          break;
        case 12: 
          strExtendedPrinterStatus = "Waiting (Esperando)"; 
          break; 
        case 13: 
          strExtendedPrinterStatus = "Processing (Procesando)"; 
          break;
        case 14: 
          strExtendedPrinterStatus = "Initialization (Inicializando)"; 
          generalState='-1'; 
          break;                     
        case 15: 
          strExtendedPrinterStatus = "Power Save (Ahorro de poder)"; 
          break;            
        case 16: 
          strExtendedPrinterStatus = "Pending Deletion (Pendiente Borrar)"; 
          break;  
        case 17: 
          strExtendedPrinterStatus = "I/O Active"; 
          break;   
        case 18: 
          strExtendedPrinterStatus = "Manual Feed (Alimentación Manual)"; 
          break;                    
     } 

    switch(printerX.prDetectedErrorState){  
        case 0: 
            strDetectedErrorstate="Unknown (Desconocido)";  //Unknown
            break; 
        case 1: 
            strDetectedErrorstate="Other (Otro)";//Other
            break; 
        case 2: 
            strDetectedErrorstate="NoError (NoError)";
            break; 
        case 3: 
            strDetectedErrorstate="Low Paper (Papel Bajo)"; //Low Paper
            generalState='-1'; 
            break; 
        case 4: 
            strDetectedErrorstate="NoPaper (Sin Papel)"; //NoPaper 
            generalState='-1'; 
            break; 
        case 5: 
            strDetectedErrorstate="Low Toner (Papel/Toner bajo)"; //Low Toner  -para zebra ttp2030 significa papel bajo
            generalState='-1'; 
            break; 
        case 6: 
            strDetectedErrorstate="NoToner (Sin Toner)"; //NoToner
            break; 
        case 7: 
            strDetectedErrorstate="Door Open (Puerta abierta)";//Door Open - 
            break; 
        case 8: 
            strDetectedErrorstate="Jammed (Atascado)";  //Jammed -
            generalState='-1'; 
            break; 
        case 9: 
            strDetectedErrorstate="Offline (Fuera de Linea)";//Offline -
            generalState='-1'; 
            break; 
        case 10: 
            strDetectedErrorstate="Service Requested (Requiere Servicio)";//Service Requested 
            generalState='-1'; 
            break; 
        case 11: 
            strDetectedErrorstate="Output Bin Full (Papel en puerta de salida)"; //Output Bin Full 
            generalState='-1'; 
            break;
    }

    switch (printerX.prExtendedDetectedErrorState){
        case 0: 
            strExtendedDetectedErrorState="Unknown (Desconocido)";//Unknown -
            break; 
        case 1: 
            strExtendedDetectedErrorState="Other (Otro)"; // Other
            break; 
        case 2: 
            strExtendedDetectedErrorState="NoError (NoError)";
            break; 
        case 3: 
            strExtendedDetectedErrorState="Low Paper (Papel Bajo)"; //Low Paper 
            generalState='-1'; 
            break; 
        case 4: 
            strExtendedDetectedErrorState="No Paper (Sin Papel)"; //No Paper
            generalState='-1'; 
            break; 
        case 5: 
            strExtendedDetectedErrorState="Low Toner (Papel/Toner Bajo)";//Low Toner 
            generalState='-1'; 
            break; 
        case 6: 
            strExtendedDetectedErrorState="No Toner (Sin Toner)"; //No Toner
            break; 
        case 7: 
            strExtendedDetectedErrorState="Door Open (Puerta abierta)"; //Door Open 
            break; 
        case 8: 
            strExtendedDetectedErrorState="Jammed (Atascado)"; //Jammed 
            generalState='-1'; 
            break; 
        case 9: 
            strExtendedDetectedErrorState="Service Requested (Requiere Servicio)"; //Service Requested 
            generalState='-1'; 
            break; 
        case 10: 
            strExtendedDetectedErrorState="Output Bin Full (Papel en puerta de salida)";//Output Bin Full 
            generalState='-1'; 
            break; 
        case 11: 
            strExtendedDetectedErrorState="Paper Problem (Problema de Papel)";//Paper Problem 
            generalState='-1'; 
            break; 
        case 12: 
            strExtendedDetectedErrorState="Cannot Print Page (No se puede imprimir la pagina)";//Cannot Print Page
            generalState='-1'; 
            break; 
        case 13: 
            strExtendedDetectedErrorState="User Intervantion Required (Requiere intervencion del Usuario)";//User Intervantion Required 
            generalState='-1'; 
            break; 
        case 14: 
            strExtendedDetectedErrorState="Out of Memory (Sin memoria)"; //Out of Memory 
            break; 
        case 15: 
            strExtendedDetectedErrorState="Server Unknown (Servidor desconocido)"; //Server Unknown 
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