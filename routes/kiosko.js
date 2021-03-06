///////
///////
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
//Ver Kioskos
router.get('/verKioskos', async (req, res) => {
    sess=req.session;
    if (!sess.username||!perfil.validarAcceso(sess.idperfil)) {
        res.redirect('/login');
    } else {
        //Codigo aqui
        const kioskos = await pool.query('SELECT * FROM tblequipo');        
        //console.log(kioskos);
        //validar si el kiosko esta activo o dado de baja para frontend helpers
        kioskos.forEach(k => {
            if(k.estado === 1){
                k.darbaja=true;
                k.txtestado='Activo';
            }else{
                k.darbaja=false;
                k.txtestado='Inactivo';
            }
        });
        
	    //18/09/2019 para corregir que se navegue hasta aqui sin estar logueado (Olivares)
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate'); 
               
        res.render('kiosko/verkioskos', {kioskos});
    }
    
});
//Agregar Kiosko
router.get('/agregarKiosko', (req, res) => {
    sess=req.session;
    if (!sess.username||!perfil.validarAcceso(sess.idperfil)) {
        res.redirect('/login');
    } else {
        //Codigo aqui
        res.render('kiosko/agregarkiosko');
    }
});

//Borrar Kiosko
router.get('/borrarkiosko/:idequipo', async (req, res) => {
    sess=req.session;
    if (!sess.username||!perfil.validarAcceso(sess.idperfil)) {
        res.redirect('/login');
    } else {
        //Codigo aqui
        const { idequipo } = req.params;
        await pool.query('DELETE FROM tblequipo WHERE idequipo = ?', [idequipo]);

        req.flash('success','Kiosko eliminado con exito');
        res.redirect('/kiosko/verkioskos');
    }
    //console.log(req.params.idequipo);
});

//Editar Kiosko
router.get('/editarkiosko/:idequipo', async (req, res) => {
    sess=req.session;
    if (!sess.username||!perfil.validarAcceso(sess.idperfil)) {
        res.redirect('/login');
    } else {
        //Codigo aqui
        const { idequipo } = req.params;
        const kiosko = await pool.query('SELECT * FROM tblequipo WHERE idequipo = ?', [idequipo]);
        res.render('kiosko/editarkiosko', {kiosko: kiosko[0]});
    }
    //console.log(req.params.idequipo);
});

//Verifica siuna ip existe en la base de datos
router.get('/checkip/:ip', async (req, res) => {
    sess=req.session;
    if (!sess.username||!perfil.validarAcceso(sess.idperfil)) {
        res.redirect('/login');
    } else {
        //Codigo aqui
        const { ip } = req.params;
        const kskExiste= await pool.query('SELECT COUNT(ipID) as existe FROM tblequipo WHERE ip = ?', [ip]);
        res.send(kskExiste);
    }
});

//motto
//12/2/2020
//dar de baja kiosko
router.get('/darbajakiosko/:idequipo', async (req, res) => {
    sess=req.session;
    if (!sess.username||!perfil.validarAcceso(sess.idperfil)) {
        res.redirect('/login');
    } else {
        //Codigo aqui
        const { idequipo } = req.params;
        await pool.query('UPDATE tblequipo SET estado=0 WHERE idequipo = ?', [idequipo]);

        req.flash('success','Kiosko dado de baja con exito');
        res.redirect('/kiosko/verkioskos');
    }
    //console.log(req.params.idequipo);
});
//activar kiosko
router.get('/activarkiosko/:idequipo', async (req, res) => {
    sess=req.session;
    if (!sess.username||!perfil.validarAcceso(sess.idperfil)) {
        res.redirect('/login');
    } else {
        //Codigo aqui
        const { idequipo } = req.params;
        await pool.query('UPDATE tblequipo SET estado=1 WHERE idequipo = ?', [idequipo]);

        req.flash('success','Activado monitoreo con exito');
        res.redirect('/kiosko/verkioskos');
    }
    //console.log(req.params.idequipo);
});

module.exports = router;