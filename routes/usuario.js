///////
///////
const express = require('express');
const router = express.Router();
const pool = require('../database');
////prefijo '/usuario'

//Ver Usuarios
router.get('/verUsuarios', async (req, res) => {
    const usuarios = await pool.query('SELECT * FROM tblusuario');
    console.log(usuarios);
    res.render('usuario/verusuarios', {usuarios});
});

//Agregar Usuario
router.get('/agregarUsuario', (req, res) => {
    res.render('usuario/agregarusuario');
});


module.exports = router;