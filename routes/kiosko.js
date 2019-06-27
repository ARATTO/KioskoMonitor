///////
///////
const express = require('express');
const router = express.Router();
const pool = require('../database');
////prefijo '/kiosko'
//Ver Kioskos
router.get('/verKioskos', async (req, res) => {
    const kioskos = await pool.query('SELECT * FROM tblequipo');
    console.log(kioskos);
    res.render('kiosko/verkioskos', {kioskos});
});
//Agregar Kiosko
router.get('/agregarKiosko', (req, res) => {
    res.render('kiosko/agregarkiosko');
});

//Borrar Kiosko
router.get('/borrarkiosko/:idequipo', async (req, res) => {
    //console.log(req.params.idequipo);
    const { idequipo } = req.params;
    await pool.query('DELETE FROM tblequipo WHERE idequipo = ?', [idequipo]);

    req.flash('success','Kiosko eliminado con exito');
    res.redirect('/kiosko/verkioskos');
});

//Editar Kiosko
router.get('/editarkiosko/:idequipo', async (req, res) => {
    //console.log(req.params.idequipo);
    const { idequipo } = req.params;
    const kiosko = await pool.query('SELECT * FROM tblequipo WHERE idequipo = ?', [idequipo]);
    res.render('kiosko/editarkiosko', {kiosko: kiosko[0]});
});

module.exports = router;