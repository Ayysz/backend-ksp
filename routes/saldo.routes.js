'use strict'

const router = require('express').Router();
const controller = require('../controllers');
const { authenticate, Authorization } = require('./login.routes');

router.get('/penarikan', authenticate, Authorization.memberOnly, controller.saldo.penarikan)
router.get('/pengembalian', authenticate, Authorization.memberOnly,controller.saldo.pengembalian);
router.get('/simpanan', authenticate, Authorization.memberOnly, controller.saldo.saldo);
router.get('/total', authenticate, Authorization.memberOnly, controller.saldo.totalSaldo);


router.use('/saldo', router);

module.exports = router;