'use strict'

const router = require('express').Router();
const controller =  require('../controllers');
const {authenticate ,Authorization} = require('./login.routes');

router.route('/')
        .get(controller.namaBank.getAll)
        .post(authenticate, Authorization.staffOnly, controller.namaBank.post);

router.route('/:id')
        .put(authenticate, Authorization.staffOnly, controller.namaBank.edit)
        .delete(authenticate, Authorization.staffOnly, controller.namaBank.destroy);

router.use('/namaBank', router);

module.exports = router;