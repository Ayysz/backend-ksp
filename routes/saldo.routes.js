'use strict'

const router = require('express').Router();
const controller = require('../controllers');
const { authenticate, Authorization } = require('./login.routes');

router.get('/penarikan/sukarela', authenticate, Authorization.memberOnly, controller.saldo.penarikanSukarela);
router.get('/penarikan/berjangka', authenticate, Authorization.memberOnly ,controller.saldo.penarikanBerjangka);
router.get('/pengembalian', authenticate, Authorization.memberOnly,controller.saldo.pengembalian);
router.get('/simpanan/berjangka', authenticate, Authorization.memberOnly, controller.saldo.saldoBerjangka);
router.get('/total', authenticate, Authorization.memberOnly, controller.saldo.totalSaldo);
router.get('/simpanan/sukarela/:id', authenticate, Authorization.memberOnly, controller.saldo.saldoSukarela);

router.use('/saldo', router);

module.exports = router;