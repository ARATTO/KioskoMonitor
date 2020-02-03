const express = require('express');
const router = express.Router();
const pool = require('../database');
const perfil=require('../lib/validarperfil');//Validador de perfil, Jose Olivares, Sept 2019
////prefijo '/kiosko'
/*
    sess=req.session;
    if (!sess.username) {
        res.redirect('/login');
    } else {
        //Codigo aqui
    }
*/


//ver Log de errores de Kiosko
//por Jose Luis Olivares, 23/09/2019
router.get('/verlogkioskos', async (req, res) => {
    sess=req.session;
    let mostrarBotones=perfil.validarAcceso(sess.idperfil) || false;
    if (!sess.username) { //||!perfil.validarAcceso(sess.idperfil)
        res.redirect('/login');
    } else {
        //Codigo aqui
        const logKioskos = await pool.query(`SELECT tblalertas_log.*, tblequipo.nombre,tblequipo.serie,tblequipo.ip,tblequipo.ubicacion,tblequipo.contacto,
        tblequipo.telefono, tblequipo.email  FROM tblalertas_log INNER JOIN tblequipo WHERE tblalertas_log.idequipo=tblequipo.idequipo`); 

        //motto 31/1/2020
        let arreglo = logKioskos.descripcion;
        try {
            logKioskos.forEach(log => {
                if(log.descripcion && log.descripcion !=='Se perdió conexión con cliente de monitoreo'){
    
                    let logCompleto = log.descripcion.split("-");
                    
                    //console.log('log', logCompleto);
                    let spliTmp;
                    spliTmp = logCompleto[0].split("=");
                    log.printer = spliTmp[1];
                    
                    spliTmp=0;
                    spliTmp = logCompleto[1].split("=");
                    log.generalState = spliTmp[1];

                    spliTmp=0;
                    spliTmp = logCompleto[2].split("=");
                    log.printerStatus = spliTmp[1];

                    spliTmp=0;
                    spliTmp = logCompleto[3].split("=");
                    log.extendedPrinterStatus = spliTmp[1];

                    spliTmp=0;
                    spliTmp = logCompleto[4].split("=");
                    log.detectedError = spliTmp[1];

                    spliTmp=0;
                    spliTmp = logCompleto[5].split("=");
                    log.extendedDetectedError = spliTmp[1];

                    console.log('printer', log);



                    //Printer=Webex Document Loader - 
                    //generalState=Listo, Otro Printer - 
                    //printerStatus=Idle (Sin Utilizar) -
                    //extendedPrinterStatus=Unknown (Desconocido) - 
                    //detectedError=Unknown (Desconocido) - 
                    //extendedDetectedError=undefined
    
    
                }else{
                    console.log('log offline', log.descripcion);
                    let tmpOff = "Offline";
                    log.printer = tmpOff;
                    log.generalState = tmpOff;
                    log.printerStatus = tmpOff;
                    log.extendedPrinterStatus = tmpOff;
                    log.detectedError = tmpOff;
                    log.extendedDetectedError = tmpOff;
                }
                
            });
        } catch (error) {
            console.log('log split');
        }
        
        //console.log('arreglo', logKioskos);
        //let registros = logKioskos.descripcion.split(" - ");
        //console.log('registros', registros);

        //console.log(kioskos);
	    //18/09/2019 para corregir que se navegue hasta aqui sin estar logueado (Olivares)
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate'); 
               
        res.render('kiosko/verlogkioskos', {logKioskos,mostrarBotones});
    }
    
});

//Borrar el contenido de la tabla alertas_log
router.get('/borrarlog/:opcion', async (req, res) => {
    sess=req.session;
    const op= parseInt(req.params.opcion); //recibiendo parametro
    if (!sess.username ||!perfil.validarAcceso(sess.idperfil)) {
        res.redirect('/login');
    } else {
        var myQuery='Select 0+0';//valor sin significado
        var msg='¡Se ha borrado el contenido del log!';
        if (op===1) {
            myQuery='TRUNCATE TABLE tblalertas_log';
        }

        if(op===2){
            myQuery='DELETE FROM tblalertas_log WHERE fecha < DATE_SUB(NOW(), INTERVAL 3 MONTH)';
            msg='¡Se ha borrado el contenido del log posterior a 3 meses!';
        }

        await pool.query(myQuery);
        req.flash('success',msg);
        res.redirect('/logs/verlogkioskos');
    }
    //console.log(req.params.idusuario);
});

module.exports = router;