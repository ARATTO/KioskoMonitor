///////
///////
const express = require('express');
const router = express.Router();
const pool = require('../database');
////prefijo '/usuario'

//Ver Usuarios
router.get('/verUsuarios', (req, res) => {
    res.render('usuario/verusuarios');
});

//Agregar Usuario
router.get('/agregarUsuario', (req, res) => {
    res.render('usuario/agregarusuario');
});


module.exports = router;