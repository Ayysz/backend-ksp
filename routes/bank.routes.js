'use strict';

const router = require('express').Router();
const controller = require('../controllers');
const {authenticate, Authorization} =require('./login.routes');

router.route('/')
        .get(authenticate, Authorization.memberOnly, controller.bank.getAll)
        .post(authenticate, Authorization.memberOnly, controller.bank.post);

router.route('/:id')
        .put(authenticate, Authorization.memberOnly, controller.bank.edit)
        .delete(authenticate, Authorization.memberOnly, controller.bank.destroy);

router.use('/bank', router);

module.exports = router;