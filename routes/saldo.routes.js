'use strict'

const router = require('express').Router();
const controller = require('../controllers');
const { authenticate, Authorization } = require('./login.routes');

router.get('/penarikan',controller.saldo.penarikan);
router.get('/pengembalian',controller.saldo.pengembalian);
router.get('/simpanan',controller.saldo.saldoSimpanan);
router.get('/total',controller.saldo.totalSaldo);

router.use('/saldo', router);

module.exports = router;