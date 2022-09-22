'use strict'

const router = require('express').Router();
const { router: authRoutes } = require('./login.routes');
const pegawaiRoutes = require('./pegawai.routes');
const jabatanRoutes = require('./jabatan.routes');
const anggotaRoutes = require('./anggota.routes');

router.use(authRoutes);
router.use(pegawaiRoutes);
router.use(jabatanRoutes);
router.use(anggotaRoutes);

module.exports = router;