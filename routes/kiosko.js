///////
///////
const express = require('express');
const router = express.Router();
const pool = require('../database');
////prefijo '/kiosko'

router.get('/verUsuarios', (req, res) => {
    res.send('Estas en kioskos');
});

module.exports = router;