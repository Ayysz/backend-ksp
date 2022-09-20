const authController = require('./auth');
const pegawaiController = require('./pegawai.controller');
const jabatanController = require('./jabatan.controller');
const controller = {};

controller.auth = authController.controller;
controller.pegawai = pegawaiController;
controller.jabatan = jabatanController;

module.exports = controller;