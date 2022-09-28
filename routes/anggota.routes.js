'use strict'

const router = require('express').Router();
const controller = require('../controllers');
const { authenticate, Authorization } = require('./login.routes');


router.route('/')
    .get(controller.anggota.getAll)
    .get('/data', authenticate, Authorization.memberOnly, controller.anggota.info)
    .post(authenticate, Authorization.memberOnly, controller.anggota.post);
router.route('/:id')
    .put(authenticate, Authorization.staffOnly, controller.anggota.edit)
    .delete(authenticate, Authorization.adminOnly, controller.anggota.destroy);

router.use('/anggota', router);

module.exports = router;