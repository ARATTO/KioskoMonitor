const express = require('express');
const router = express.Router();

router.get('/verUsuarios', (req, res) => {
    res.send('Hello Wolrd');
});

module.exports = router;