'use strict'

const router = require('express').Router();
const controller = require('../controllers');
const { authenticate, Authorization } = require('./login.routes');

router.route('/')
    .get(authenticate, Authorization.staffOnly, controller.anggota.getAll)
    .post(authenticate, Authorization.memberOnly, controller.anggota.post);

router.get('/info', authenticate, Authorization.memberOnly, controller.anggota.info)
    
router.route('/:id')
    .put(authenticate, Authorization.memberOnly, controller.anggota.edit)
    .delete(authenticate, Authorization.adminOnly, controller.anggota.destroy);

router.use('/anggota', router);

module.exports = router;