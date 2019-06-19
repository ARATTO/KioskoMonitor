dim NIC1, Nic, StrIP, CompName

'Set NIC1 =     GetObject("winmgmts:").InstancesOf("Win32_NetworkAdapterConfiguration")
 

    strComputer = "."

    Set objWMIService = GetObject("winmgmts:\\" & strComputer & "\root\CIMV2")


    Set colItems = objWMIService.ExecQuery("SELECT * FROM Win32_NetworkAdapterConfiguration",,48)



For Each Nic in colItems

    if Nic.IPEnabled then
        StrIP = Nic.IPAddress(i)

        Set WshNetwork = WScript.CreateObject("WScript.Network")
        CompName= WshNetwork.Computername

        MsgBox "IP Address:  "&StrIP & vbNewLine _
            & "Computer Name:  "&CompName,4160,"IP Address and Computer Name"

        wscript.quit
    End if
Next

