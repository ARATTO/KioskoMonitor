///////
///////
const express = require('express');
const router = express.Router();
const pool = require('../database');
////prefijo '/usuario'

router.get('/verUsuarios', (req, res) => {
    res.render('usuario/verusuarios');
});

router.post('/verUsuarios', (req, res) =>{
    res.send('recibido');
});


module.exports = router;