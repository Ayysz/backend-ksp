'use strict'

const router = require('express').Router();
const controller = require('../controllers');
const { authenticate, Authorization } = require('./login.routes');
const { upload } = require('../helper/multer');

router.route('/')
    .get(authenticate, Authorization.memberOnly, controller.pinjam.getAll)
    .post(authenticate, Authorization.memberOnly, upload.single('file'), controller.pinjam.post);

router.route('/:id')
    .put(authenticate, Authorization.memberOnly, upload.single('file'), controller.pinjam.edit)
    .delete(authenticate, Authorization.memberOnly, controller.pinjam.destroy);

router.use('/simpan', router);

module.exports = router;