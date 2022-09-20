const authController = require('./auth');
const pegawaiController = require('./pegawai.controller');
const controller = {};

controller.auth = authController.controller;
controller.pegawai = pegawaiController;

module.exports = controller;