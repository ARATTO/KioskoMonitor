///////
///////
const express = require('express');
const router = express.Router();
const pool = require('../database');

///////////////////
// USUARIO
////////////////////

//------------
//POST
//------------
//Agregar usuario
router.post('/usuario/agrearUsuario', async (req, res) => {
    const {nombre_usuario, email, password} = req.body;
    idPerfil = 0;
    //fecha_creacion = new Date().toISOString();
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

});
//Editar usuario
router.post('/usuario/editarUsuario/:idusuario', async (req, res) => {
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

});


module.exports = router;