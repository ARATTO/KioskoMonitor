///////
///////
const express = require('express');
const router = express.Router();
const pool = require('../database');
///////////////////
/*
    sess=req.session;
    if (!sess.username) {
        res.redirect('/login');
    } else {
        //Codigo aqui
    }
*/
///////////////////
///////////////////
// USUARIO
////////////////////

//------------
//POST
//------------
//Agregar usuario
router.post('/usuario/agrearUsuario', async (req, res) => {
    sess=req.session;
    if (!sess.username) {
        res.redirect('/login');
    } else {
        //Codigo aqui
        const {nombre_usuario, email, password} = req.body;
        //Crear usuario que NO es admin: idPerfil = 0
        idPerfil = 0;
        const newUser = {
            nombre_usuario,
            email,
            password,
            idPerfil,
        };
        await pool.query('INSERT INTO tblusuario SET ?', [newUser]);
        req.flash('success','Usuario guardado con exito');
        //console.log(nombre);
        res.redirect('/usuario/verusuarios');
    }

});
//Editar usuario
router.post('/usuario/editarUsuario/:idusuario', async (req, res) => {
    sess=req.session;
    if (!sess.username) {
        res.redirect('/login');
    } else {
        //Codigo aqui
        const { idusuario } = req.params;
        const {nombre_usuario, email, password} = req.body;
        
        const editUser = {
            nombre_usuario,
            email,
            password
        };
        await pool.query('UPDATE tblusuario SET ? WHERE idusuario = ?', [editUser, idusuario]);
        req.flash('success','Usuario actualizado con exito');
        //console.log(nombre);
        res.redirect('/usuario/verusuarios');
    }
});

///////////////////
// KIOSKO
////////////////////

//------------
//POST
//------------
//Agregar kiosko
router.post('/kiosko/agrearKiosko', async (req, res) => {
    sess=req.session;
    if (!sess.username) {
        res.redirect('/login');
    } else {
        //Codigo aqui
        const {nombre, serie, ip, ubicacion, contacto, telefono, email} = req.body;
    
        ipID = ip.split('.').join("");
        console.log(ipID);
        const newKiosko = {
            nombre, 
            serie, 
            ip, 
            ipID,
            ubicacion, 
            contacto, 
            telefono, 
            email
        };
        await pool.query('INSERT INTO tblequipo SET ?', [newKiosko]);
        req.flash('success','Kiosko guardado con exito');
        res.redirect('/kiosko/verkioskos');
    }
});
//Editar kiosko
router.post('/kiosko/editarKiosko/:idequipo', async (req, res) => {
    sess=req.session;
    if (!sess.username) {
        res.redirect('/login');
    } else {
        //Codigo aqui
        const { idequipo } = req.params;
        const {nombre, serie, ip, ubicacion, contacto, telefono, email} = req.body;
        ipID = ip.split('.').join("");
        const editKiosko = {
            nombre, 
            serie, 
            ip,
            ipID, 
            ubicacion, 
            contacto, 
            telefono, 
            email
        };
        await pool.query('UPDATE tblequipo SET ? WHERE idequipo = ?', [editKiosko, idequipo]);
        req.flash('success','Kiosko actualizado con exito');
        //console.log(nombre);
        res.redirect('/kiosko/verkioskos');
    }
});

module.exports = router;