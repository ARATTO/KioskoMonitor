function leerConfManagerErrorCode(errCode){
	var errSignificado=-1;

    switch (errCode){
        case 0: 
            errSignificado="Device is working properly.";
            break; 
        case 1: 
            errSignificado="Device is not configured correctly."; 
            break; 
        case 2: 
            errSignificado="Windows cannot load the driver for this device.";
            break; 
        case 3: 
            errSignificado="The driver for this device might be corrupted, or your system may be running low on memory or other resources."; 
            break; 
        case 4: 
            errSignificado="This device is not working properly. One of its drivers or your registry might be corrupted."; 
            break; 
        case 5: 
            errSignificado="The driver for this device needs a resource that Windows cannot manage.";
            break; 
        case 6: 
            errSignificado="The boot configuration for this device conflicts with other devices. "; 
            break; 
        case 7: 
            errSignificado="Cannot filter."; 
            break; 
        case 8: 
            errSignificado="The driver loader for the device is missing."; 
            break; 
        case 9: 
            errSignificado="This device is not working properly because the controlling firmware is reporting the resources for the device incorrectly.";  
            break; 
        case 10: 
            errSignificado="This device cannot start.";
            break; 
        case 11: 
            errSignificado="This device failed.";
            break; 
        case 12: 
            errSignificado="This device cannot find enough free resources that it can use.";
            break; 
        case 13: 
            errSignificado="Windows cannot verify this device's resources.";
            break; 
        case 14: 
            errSignificado="This device cannot work properly until you restart your computer. "; 
            break; 
        case 15: 
            errSignificado="This device is not working properly because there is probably a re-enumeration problem. "; 
            break;
        case 16: 
            errSignificado="Windows cannot identify all the resources this device uses."; 
            break; 
        case 17: 
            errSignificado="This device is asking for an unknown resource type."; 
            break; 
        case 18: 
            errSignificado="Reinstall the drivers for this device."; 
            break; 
        case 19: 
            errSignificado="Failure using the VxD loader.";  
            break; 
        case 20: 
            errSignificado="Your registry might be corrupted.";
            break; 
        case 21: 
            errSignificado="System failure. If changing the device driver is ineffective, see the hardware documentation. Windows is removing the device.";
            break; 
        case 22: 
            errSignificado="This device is disabled.";
            break; 
        case 23: 
            errSignificado="System failure. If changing the device driver is ineffective, see the hardware documentation.";
            break; 
        case 24: 
            errSignificado="This device is not present, is not working properly, or does not have all its drivers installed."; 
            break; 
        case 25: 
            errSignificado="Windows is still setting up this device."; 
            break;
        case 26: 
            errSignificado="Windows is still setting up this device.";
            break; 
        case 27: 
            errSignificado="This device does not have valid log configuration.";
            break; 
        case 28: 
            errSignificado="The drivers for this device are not installed.";
            break; 
        case 29: 
            errSignificado="This device is disabled because the firmware of the device did not give it the required resources."; 
            break; 
        case 30: 
            errSignificado="This device is using an Interrupt Request (IRQ) resource that another device is using."; 
            break;
        case 31: 
            errSignificado="This device is not working properly because Windows cannot load the drivers required for this device. "; 
            break;

	}

	return errSignificado;
};