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
const simpanRoutes = require('./simpan.routes');
const pinjamRoutes = require('./pinjam.routes');
const permohonanRoutes = require('./permohonan.routes');
const saldoRoutes = require('./saldo.routes');
const miscRoutes = require('./misc.routes');

router.use(authRoutes);
router.use(pegawaiRoutes);
router.use(jabatanRoutes);
router.use(anggotaRoutes);
router.use(bankRoutes);
router.use(namaBankRoutes);
router.use(pekerjaanRoutes);
router.use(transaksiRoutes);
router.use(simpanRoutes);
router.use(pinjamRoutes);
router.use(permohonanRoutes);
router.use(saldoRoutes);
router.use(miscRoutes);

module.exports = router;