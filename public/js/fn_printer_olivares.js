function evaluaEstadoPrinter(printerX){
	var strPrinterStatus='-1',strDetectedErrorstate='-1',strExtendedDetectedErrorState='-1';
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
          break; 
        case 7: 
          strPrinterStatus = "Fuera de Linea"; //Offline 
          break;       
     }   

    switch(printerX.prDetectedErrorState){  
        case 0: 
            strDetectedErrorstate="Desconocido";  //Unknown
            break; 
        case 1: 
            strDetectedErrorstate="Otro";//Other
            break; 
        case 2: 
            strDetectedErrorstate=" NoError";
            break; 
        case 3: 
            strDetectedErrorstate="Papel Bajo"; //Low Paper
            break; 
        case 4: 
            strDetectedErrorstate="Sin Papel"; //NoPaper 
            break; 
        case 5: 
            strDetectedErrorstate="Papel Bajo"; //Low Toner  -para zebra ttp2030 significa papel bajo
            break; 
        case 6: 
            strDetectedErrorstate="Sin Toner"; //NoToner
            break; 
        case 7: 
            strDetectedErrorstate="Puerta abierta";//Door Open - 
            break; 
        case 8: 
            strDetectedErrorstate="Atascado";  //Jammed -
            break; 
        case 9: 
            strDetectedErrorstate="Fuera de Linea";//Offline -
            break; 
        case 10: 
            strDetectedErrorstate="Requiere Servicio";//Service Requested 
            break; 
        case 11: 
            strDetectedErrorstate="Papel en puerta de salida"; //Output Bin Full 
            break;
    }


    switch (printerX.prExtendedDetectedErrorState){
        case 0: 
            strExtendedDetectedErrorState="Desconocido";//Unknown -
            break; 
        case 1: 
            strExtendedDetectedErrorState="Otro"; // Other
            break; 
        case 2: 
            strExtendedDetectedErrorState=" NoError";
            break; 
        case 3: 
            strExtendedDetectedErrorState="Papel Bajo"; //Low Paper 
            break; 
        case 4: 
            strExtendedDetectedErrorState="Sin Papel"; //No Paper
            break; 
        case 5: 
            strExtendedDetectedErrorState="Papel Bajo";//Low Toner 
            break; 
        case 6: 
            strExtendedDetectedErrorState="Sin Toner"; //No Toner
            break; 
        case 7: 
            strExtendedDetectedErrorState="Puerta abierta"; //Door Open 
            break; 
        case 8: 
            strExtendedDetectedErrorState="Atascado"; //Jammed 
            break; 
        case 9: 
            strExtendedDetectedErrorState="Requiere Servicio"; //Service Requested 
            break; 
        case 10: 
            strExtendedDetectedErrorState="Papel en puerta de salida";//Output Bin Full 
            break; 
        case 11: 
            strExtendedDetectedErrorState="Problema de Papel";//Paper Problem 
            break; 
        case 12: 
            strExtendedDetectedErrorState="No se puede imprimir la pagina";//Cannot Print Page
            break; 
        case 13: 
            strExtendedDetectedErrorState="Requiere intervencion del Usuario";//User Intervantion Required 
            break; 
        case 14: 
            strExtendedDetectedErrorState="Sin memoria"; //Out of Memory 
            break; 
        case 15: 
            strExtendedDetectedErrorState="Servidor desconocido"; //Server Unknown 
            break;
	}//end switch

		if(printerX.prStatus!==7 && printerX.prDetectedErrorState===0){
			strPrinterStatus="Listo";
		}

	return {status:strPrinterStatus,detectedErrorState:strDetectedErrorstate,extendedDetectedErrorState:strExtendedDetectedErrorState};
}
