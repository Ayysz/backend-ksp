const router = require('express').Router();
const { router: authRoutes } = require('./login.routes');
const pegawaiRoutes = require('./pegawai.routes');
const jabatanRoutes = require('./jabatan.routes');

router.use(authRoutes);
router.use(pegawaiRoutes);
router.use(jabatanRoutes);

module.exports = router;