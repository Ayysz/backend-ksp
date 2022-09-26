'use strict'

const router = require('express').Router();
const controller = require('../controllers');
const { authenticate, Authorization } = require('./login.routes');
const { upload } = require('../helper/multer');

router.route('/')
    .get(authenticate, Authorization.memberOnly, controller.transaksi.getAll)
    .post(authenticate, Authorization.memberOnly, upload.single('file'), controller.transaksi.post)
    
router.route('/:id')
    .put(authenticate, Authorization.memberOnly, upload.single('file'), controller.transaksi.edit)
    .delete(authenticate, Authorization.memberOnly, controller.transaksi.destroy)

router.use('/transaksi', router);

module.exports = router;