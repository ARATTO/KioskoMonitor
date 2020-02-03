///////
///////
const express = require('express');
const router = express.Router();
const pool = require('../database');
const perfil=require('../lib/validarperfil');//Validador de perfil
//encriptamiento, Jolivares
    const SimpleCrypto3=require('simple-crypto-js').default;
    const _secretKey=require('../lib/secret');
    const simpleCrypto3=new SimpleCrypto3(_secretKey);
////prefijo '/usuario'
/*
    sess=req.session;
    if (!sess.username) {
        res.redirect('/login');
    } else {
        //Codigo aqui
    }
*/
//Ver Usuarios
router.get('/verUsuarios', async (req, res, ) => {
    //console.log(req.session);
    sess=req.session;
    if (!sess.username||!perfil.validarAcceso(sess.idperfil)) {
        res.redirect('/login');
    } else {
        // const usuarios = await pool.query('SELECT * FROM tblusuario');
        //18/09/2019 para corregir que se navegue hasta aqui sin estar logueado (Olivares)
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate'); 
            const usuarios=await pool.query(
                `SELECT tblusuario.*, tblperfil_usuario.nombre as nombre_perfil from tblusuario,
                tblperfil_usuario where tblusuario.idPerfil=tblperfil_usuario.idperfil`);

                res.render('usuario/verusuarios', {usuarios});
    }
    
});
//Agregar Usuario
router.get('/agregarUsuario', async (req, res) => {
    sess=req.session;
    if (!sess.username||!perfil.validarAcceso(sess.idperfil)) {
        res.redirect('/login');
    } else {
        const tblPerfil = await pool.query('SELECT * FROM tblperfil_usuario WHERE idperfil <> 1');//olivares
        //console.log(tblPerfil);
        res.render('usuario/agregarusuario',{tblPerfil});//olivares
    }
    
});
//Borrar Usuario
router.get('/borrarusuario/:idusuario', async (req, res) => {
    sess=req.session;
    if (!sess.username||!perfil.validarAcceso(sess.idperfil)) {
        res.redirect('/login');
    } else {
        //Codigo aqui
        const { idusuario } = req.params;
        if (idusuario != 1) {  //solo cambiaremos el estado del usuario 0 eliminado, 1 activo, 2 inactivo
            await pool.query('UPDATE tblusuario SET estado=0 WHERE idusuario = ?', [idusuario]);
        }
        req.flash('success','El estado del usuario se ha establecido a ELIMINADO');
        res.redirect('/usuario/verusuarios');
    }
    //console.log(req.params.idusuario);
});
//Editar Usuario
router.get('/editarusuario/:idusuario', async (req, res) => {
    sess=req.session;
    if (!sess.username||!perfil.validarAcceso(sess.idperfil)) {
        res.redirect('/login');
    } else {
        //Codigo aqui
        const { idusuario } = req.params;
        if (idusuario != 1) {
            //res.send('prueba');
            let usuario = await pool.query('SELECT * FROM tblusuario WHERE idusuario = ?', [idusuario]);
            
            //desencriptando Password
            let pw=simpleCrypto3.decrypt(usuario[0].password);
            usuario[0].password=pw;
            //18/09/2019  listado de perfiles, Olivares 
            const perfil=await pool.query('SELECT * FROM tblperfil_usuario WHERE idperfil <> 1');
            //console.log(usuario[0]);
            
            //18/09/2019 para corregir que se navegue hasta aqui sin estar logueado (Olivares)
            res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate'); 
            res.render('usuario/editarusuario', {usuario: usuario[0],perfil});
        }else{
            res.redirect('/usuario/verusuarios');
        }
    }
    //console.log(req.params.idusuario);
});

module.exports = router;