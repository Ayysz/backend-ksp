'use strict'

const controller = require('../controllers');
const router = require('express').Router();
const passport = require('passport');
const { authenticate, Authorization } = require('./login.routes');

router.route('/')
    .get(controller.pegawai.getAll)
    // butuh authentikasi
    .post(authenticate, Authorization.memberOnly, controller.pegawai.post);

router.route('/:id')
    // butuh authentikasi
    .put(authenticate, Authorization.memberOnly, controller.pegawai.edit)
    .delete(authenticate, Authorization.staffOnly, controller.pegawai.destroy);

router.use('/pegawai', router);

module.exports = router;