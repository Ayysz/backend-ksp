'use strict'

const router = require('express').Router();
const controller = require('../controllers');
const { authenticate, Authorization } = require('./login.routes');
const { upload } = require('../helper/multer');

router.route('/')
    .get(authenticate, Authorization.memberOnly, controller.simpan.getAll);
    // .post(authenticate, Authorization.memberOnly, upload.single('file'), controller.simpan.post);

// router.route('/:id')
//     .put(authenticate, Authorization.memberOnly, upload.single('file'), controller.simpan.edit)
//     .delete(authenticate, Authorization.memberOnly, controller.simpan.destroy);

router.use('/simpan', router);

module.exports = router;