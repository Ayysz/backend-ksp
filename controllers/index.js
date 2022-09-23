const authController = require('./auth');
const pegawaiController = require('./pegawai.controller');
const jabatanController = require('./jabatan.controller');
const anggotaController = require('./anggota.controller');
const bankController = require('./bank.controller');
const namaBankController = require('./nama_bank.controller');
const controller = {};

controller.auth = authController.controller;
controller.pegawai = pegawaiController;
controller.jabatan = jabatanController;
controller.anggota = anggotaController;
controller.bank = bankController;
controller.namaBank = namaBankController;

module.exports = controller;