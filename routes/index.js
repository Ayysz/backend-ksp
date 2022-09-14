const router = require('express').Router();
const authRoutes = require('./login.routes');

router.use(authRoutes);

module.exports = router;