' VBScript source code 
ttpname="Zebra TTP 2030" 
strComputer = "." 
Set objWMIService = GetObject("winmgmts:" _ 
    & "{impersonationLevel=impersonate}!\\" & strComputer & "\root\cimv2") 
Set wbemObjectSet = objWMIService.ExecQuery("SELECT * FROM Win32_Printer") 

For Each wbemObject In wbemObjectSet 
    if wbemObject.Default = TRUE then 
        ttpname = wbemObject.Caption 
Wscript.Echo  "Printer " & ttpname 

Select Case wbemObject.PrinterStatus 
Case 1 
            strPrinterStatus = "Other" 
    strExtendedPrinterStatus  = wbemObject.ExtendedPrinterStatus 
        Case 2 
    strPrinterStatus = "Unknown" 
        Case 3 
    strPrinterStatus = "Idle" 
        Case 4 
            strPrinterStatus = "Printing" 
        Case 5 
    strPrinterStatus = "Warmup" 
        Case 6 
    strPrinterStatus = "Stopped printing" 
        Case 7 
    strPrinterStatus = "Offline" 
        End Select 
Wscript.Echo  "Printer Status: " & strPrinterStatus 

Select Case wbemObject.DetectedErrorState  
Case 0 
    Wscript.Echo  "DetectedErrorState: " & wbemObject.DetectedErrorState & " Unknown" 
case 1 
    Wscript.Echo  "DetectedErrorState: " & wbemObject.DetectedErrorState & " Other" 
case 2 
    Wscript.Echo  "DetectedErrorState: " & wbemObject.DetectedErrorState & " NoError" 
case 3 
    Wscript.Echo  "DetectedErrorState: " & wbemObject.DetectedErrorState & " Low Paper" 
case 4 
    Wscript.Echo  "DetectedErrorState: " & wbemObject.DetectedErrorState & " NoPaper" 
case 5 
    Wscript.Echo  "DetectedErrorState: " & wbemObject.DetectedErrorState & " Low Toner" 
case 6 
    Wscript.Echo  "DetectedErrorState: " & wbemObject.DetectedErrorState & " NoToner" 
case 7 
    Wscript.Echo  "DetectedErrorState: " & wbemObject.DetectedErrorState & " Door Open" 
case 8 
    Wscript.Echo  "DetectedErrorState: " & wbemObject.DetectedErrorState & " Jammed" 
case 9 
    Wscript.Echo  "DetectedErrorState: " & wbemObject.DetectedErrorState & " Offline " 
case 10 
    Wscript.Echo  "DetectedErrorState: " & wbemObject.DetectedErrorState & " Service Requested" 
case 11 
    Wscript.Echo  "DetectedErrorState: " & wbemObject.DetectedErrorState & " Output Bin Full" 
End Select 

Select Case wbemObject.ExtendedDetectedErrorState  
Case 0 
    Wscript.Echo  "ExtendedDetectedErrorState: " & wbemObject.ExtendedDetectedErrorState & " Unknown" 
case 1 
    Wscript.Echo  "ExtendedDetectedErrorState: " & wbemObject.ExtendedDetectedErrorState & " Other" 
case 2 
    Wscript.Echo  "ExtendedDetectedErrorState: " & wbemObject.ExtendedDetectedErrorState & " No Error" 
case 3 
    Wscript.Echo  "ExtendedDetectedErrorState: " & wbemObject.ExtendedDetectedErrorState & " Low Paper" 
case 4 
    Wscript.Echo  "ExtendedDetectedErrorState: " & wbemObject.ExtendedDetectedErrorState & " No Paper" 
case 5 
    Wscript.Echo  "ExtendedDetectedErrorState: " & wbemObject.ExtendedDetectedErrorState & " Low Toner" 
case 6 
    Wscript.Echo  "ExtendedDetectedErrorState: " & wbemObject.ExtendedDetectedErrorState & " No Toner" 
case 7 
    Wscript.Echo  "ExtendedDetectedErrorState: " & wbemObject.ExtendedDetectedErrorState & " Door Open" 
case 8 
    Wscript.Echo  "ExtendedDetectedErrorState: " & wbemObject.ExtendedDetectedErrorState & " Jammed" 
case 9 
    Wscript.Echo  "ExtendedDetectedErrorState: " & wbemObject.ExtendedDetectedErrorState & " Service Requested" 
case 10 
    Wscript.Echo  "ExtendedDetectedErrorState: " & wbemObject.ExtendedDetectedErrorState & " Output Bin Full" 
case 11 
    Wscript.Echo  "ExtendedDetectedErrorState: " & wbemObject.ExtendedDetectedErrorState & " Paper Problem" 
case 12 
    Wscript.Echo  "ExtendedDetectedErrorState: " & wbemObject.ExtendedDetectedErrorState & " Cannot Print Page" 
case 13 
    Wscript.Echo  "ExtendedDetectedErrorState: " & wbemObject.ExtendedDetectedErrorState & " User Intervantion Required" 
case 14 
    Wscript.Echo  "ExtendedDetectedErrorState: " & wbemObject.ExtendedDetectedErrorState & " Out of Memory" 
case 15 
    Wscript.Echo  "ExtendedDetectedErrorState: " & wbemObject.ExtendedDetectedErrorState & " Server Unknown" 
End Select 
end if 
Next 
Wscript.Echo  "Printer " & ttpname 