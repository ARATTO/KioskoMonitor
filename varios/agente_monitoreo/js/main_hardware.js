//-----------------------------------------------------------------------------
//Libreria para leer estatus del Hardware
//Implementado por Jose Luis Olivares, email: joseluiss_503@hotmail.com
//Version 1.0,    Septiembre 2017
//-----------------------------------------------------------------------------

//***Global Vars****
 

function hardwareStatus(){
    var locator = new ActiveXObject ("WbemScripting.SWbemLocator");//solo en Iexplorer
    var service = locator.ConnectServer(".");
	var propCpu=service.ExecQuery("SELECT * FROM Win32_Processor");

      var e = new Enumerator (propCpu);
      document.write("<table border=1>");
      for (;!e.atEnd();e.moveNext ())
      {
            var p = e.item ();
            document.write("<tr>");
            document.write("<td>" + p.Caption + "</td>");
            document.write("<td>" + p.DeviceID + "</td>");
            document.write("<td>" + p.Name + "</td>");
            document.write("<td>" + p.CpuStatus + "</td>");
            document.write("<td>" + p.Availability + "</td>");
            document.write("<td>" + p.Level + "</td>");
            document.write("<td>" + p.ProcessorID + "</td>");
            document.write("<td>" + p.SystemName + "</td>");
            document.write("<td>" + p.ProcessorType + "</td>");
            document.write("</tr>");
      }
      document.write("</table>");

      document.write("<br>");

      //Disk
      var propDisks=service.ExecQuery("Select * from Win32_DiskDrive where Size>0");





 	//return {status:strPrinterStatus,detectedErrorState:strDetectedErrorstate,extendedDetectedErrorState:strExtendedDetectedErrorState};     
};
