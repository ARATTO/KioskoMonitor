///////
///////
const express = require('express');
const router = express.Router();
const pool = require('../database');


router.get('/verUsuarios', (req, res) => {
    res.send('Hello Wolrd');
});

module.exports = router;