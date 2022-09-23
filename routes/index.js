'use strict'

const router = require('express').Router();
const { router: authRoutes } = require('./login.routes');
const pegawaiRoutes = require('./pegawai.routes');
const jabatanRoutes = require('./jabatan.routes');
const anggotaRoutes = require('./anggota.routes');
const bankRoutes = require('./bank.routes');
const namaBankRoutes = require('./nama_bank.routes');

router.use(authRoutes);
router.use(pegawaiRoutes);
router.use(jabatanRoutes);
router.use(anggotaRoutes);
router.use(bankRoutes);
router.use(namaBankRoutes);

module.exports = router;