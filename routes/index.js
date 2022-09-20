const router = require('express').Router();
const { router: authRoutes } = require('./login.routes');
const pegawaiRoutes = require('./pegawai.routes');

router.use(authRoutes);
router.use(pegawaiRoutes);

module.exports = router;