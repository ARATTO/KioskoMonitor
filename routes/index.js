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
    const{nombre_usuario, email, password} = req.body;
    const newUser = {
        nombre_usuario,
        email,
        password
    };
    await pool.query('INSERT INTO tblusuario SET ?', [newUser]);
    console.log(nombre);
    res.send('recibido');
});

module.exports = router;