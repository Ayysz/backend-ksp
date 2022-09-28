const authController = require('./auth');
const pegawaiController = require('./pegawai.controller');
const jabatanController = require('./jabatan.controller');
const anggotaController = require('./anggota.controller');
const bankController = require('./bank.controller');
const namaBankController = require('./nama_bank.controller');
const pekerjaanController = require('./pekerjaan.controller');
const transaksiController = require('./transaksi.controller');
const simpanController = require('./simpan.controller');
const pinjamController = require('./pinjam.controller');
const miscController = require('./misc.controller');
const controller = {};

controller.auth = authController.controller;
controller.pegawai = pegawaiController;
controller.jabatan = jabatanController;
controller.anggota = anggotaController;
controller.bank = bankController;
controller.namaBank = namaBankController;
controller.pekerjaan = pekerjaanController;
controller.transaksi = transaksiController;
controller.simpan = simpanController;
controller.pinjam = pinjamController;
controller.misc = miscController;

module.exports = controller;