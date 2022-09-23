'use strict'

const router = require('express').Router();
const controller = require('../controllers');
const { authenticate, Authorization } = require('./login.routes');

router.route('/')
    .get(controller.pekerjaan.getAll)
    .post(authenticate, Authorization.leaderOnly, controller.pekerjaan.post)

router.route('/:id')
    .put(authenticate, Authorization.leaderOnly, controller.pekerjaan.edit)
    .delete(authenticate, Authorization.leaderOnly, controller.pekerjaan.destroy)

router.use('/pekerjaan', router);

module.exports = router;