'use strict'

const router = require('express').Router();
const { router: authRoutes } = require('./login.routes');
const pegawaiRoutes = require('./pegawai.routes');
const jabatanRoutes = require('./jabatan.routes');
const anggotaRoutes = require('./anggota.routes');
const bankRoutes = require('./bank.routes');
const namaBankRoutes = require('./nama_bank.routes');
const pekerjaanRoutes = require('./pekerjaan.routes');
const transaksiRoutes = require('./transaksi.routes');
const miscRoutes = require('./misc.routes');

router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
router.use(authRoutes);
router.use(pegawaiRoutes);
router.use(jabatanRoutes);
router.use(anggotaRoutes);
router.use(bankRoutes);
router.use(namaBankRoutes);
router.use(pekerjaanRoutes);
router.use(transaksiRoutes);
router.use(miscRoutes);

module.exports = router;