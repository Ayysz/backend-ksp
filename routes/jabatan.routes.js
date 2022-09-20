'use strict'

const router = require('express').Router();
const controller = require('../controllers/index');
const {Authorization, authenticate} = require('../routes/login.routes');

router.route('/')
    .get(controller.jabatan.getAll)
    .post(authenticate, Authorization.staffOnly, controller.jabatan.post)

router.route('/:id')
    .put(authenticate, Authorization.leaderOnly, controller.jabatan.edit)
    .delete(authenticate, Authorization.leaderOnly, controller.jabatan.destroy)

router.use('/jabatan', router);

module.exports = router;