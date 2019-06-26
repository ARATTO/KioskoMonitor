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
//Borrar Usuario
router.get('/borrarusuario/:idusuario', async (req, res) => {
    //console.log(req.params.idusuario);
    const { idusuario } = req.params;
    if (idusuario != 1) {
        await pool.query('DELETE FROM tblusuario WHERE idusuario = ?', [idusuario]);
    }
    res.redirect('/usuario/verusuarios');
});
//Editar Usuario
router.get('/editarusuario/:idusuario', async (req, res) => {
    //console.log(req.params.idusuario);
    const { idusuario } = req.params;
    if (idusuario != 1) {
        //res.send('prueba');
        const usuario = await pool.query('SELECT * FROM tblusuario WHERE idusuario = ?', [idusuario]);
        //console.log(usuario[0]);
        res.render('usuario/editarusuario', {usuario: usuario[0]});
    }else{
        res.redirect('/usuario/verusuarios');
    }
});

module.exports = router;