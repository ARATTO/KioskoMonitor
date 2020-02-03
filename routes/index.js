///////
///////
const express = require('express');
const router = express.Router();
const pool = require('../database');
const SimpleCrypto=require("simple-crypto-js").default;//password encrypt, Olivares
const _secretKey=require('../lib/secret');

let simpleCrypto2= new SimpleCrypto(_secretKey);

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
        let {nombre_usuario, email, password,idPerfil} = req.body;

        //encriptando password
            password=simpleCrypto2.encrypt(password);
        //console.log(`************ Password encriptada: ${password} `);
        //Crear usuario 
        const newUser = {
            nombre_usuario,
            email,
            password,
            idPerfil,
        };
        //console.log(newUser.email);
        const existe = await pool.query('SELECT * FROM tblusuario WHERE email = ?', [newUser.email]);
        //console.log(existe.length);
        if(existe.length > 0){
            req.flash('success','El correo que desea ingresar ya esta asignado para otro usuario.');
        }else{
            await pool.query('INSERT INTO tblusuario SET ?', [newUser]);
            req.flash('success','Usuario guardado con exito');
        }
        
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
        let  {nombre_usuario, email, password,idPerfil,estado} = req.body;
        
        //encriptando password
            password=simpleCrypto2.encrypt(password);

        //console.log(req.body);
        const editUser = {
            nombre_usuario,
            email,
            password,
            idPerfil,
            estado
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
        //Quitar puntos de IP para el IpID
        ipID = ip.split('.').join("");
        //console.log(ipID);
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