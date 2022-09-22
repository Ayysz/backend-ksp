const authController = require('./auth');
const pegawaiController = require('./pegawai.controller');
const jabatanController = require('./jabatan.controller');
const anggotaController = require('./anggota.controller');
const controller = {};

controller.auth = authController.controller;
controller.pegawai = pegawaiController;
controller.jabatan = jabatanController;
controller.anggota = anggotaController;

module.exports = controller;