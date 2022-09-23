'use strict'

const router = require('express').Router();
const controller =  require('../controllers');
const {authenticate ,Authorization} = require('./login.routes');

router.route('/')
        .get(controller.namaBank.getAll)
        .post(authenticate, Authorization.leaderOnly, controller.namaBank.post);

router.route('/:id')
        .put(authenticate, Authorization.leaderOnly, controller.namaBank.edit)
        .delete(authenticate, Authorization.leaderOnly, controller.namaBank.destroy);

router.use('/namaBank', router);

module.exports = router;