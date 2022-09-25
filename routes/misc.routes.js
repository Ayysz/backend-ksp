'use strict'

const router = require('express').Router();
const controller = require('../controllers');
const { authenticate, Authorization } = require('./login.routes');
const { upload } = require('../helper/multer');

// test route upload file
router.post('/testUpload', upload.single('pict'), controller.misc.uploadTest);
router.get('/role', authenticate, Authorization.adminOnly, controller.misc.role);
router.get('/jenisKepemilikan', authenticate, Authorization.adminOnly, controller.misc.jenisKepemilikan);
router.get('/jenisTransaksi', authenticate, Authorization.adminOnly, controller.misc.jenisTransaksi);

module.exports = router;