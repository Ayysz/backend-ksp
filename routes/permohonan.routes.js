'use strict'

const router = require('express').Router();
const controller = require('../controllers');
const { authenticate, Authorization } = require('./login.routes');


router.route('/')
    .get(authenticate, Authorization.staffOnly, controller.permohonan.getAll)
    .post(authenticate, Authorization.staffOnly, controller.permohonan.post);

router.route('/:id')
    .put(authenticate, Authorization.leaderOnly, controller.permohonan.edit)
    .delete(authenticate, Authorization.adminOnly, controller.permohonan.destroy);

router.use('/permohonan', router);

module.exports = router;