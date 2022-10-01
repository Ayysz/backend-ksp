'use strict';

const fs = require('fs-extra');
const path = require('path');
const pathFile = path.join(__dirname, '../', '/src');

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    // view penarikan
    await queryInterface.sequelize.query("CREATE VIEW penarikan AS SELECT anggota_id, jenis_transaksi_id,is_active, sum(jumlah) as jumlah FROM t_transaksi WHERE jenis_transaksi_id = 2 AND is_active = 1 GROUP BY anggota_id, jenis_transaksi_id");

    // view pengembalian
    await queryInterface.sequelize.query("CREATE VIEW pengembalian AS SELECT anggota_id, jenis_transaksi_id,is_active, sum(jumlah) as jumlah FROM `t_transaksi` WHERE jenis_transaksi_id = 1 AND is_active = 1 GROUP BY anggota_id, jenis_transaksi_id");

    // view simpanan
    await queryInterface.sequelize.query("CREATE VIEW saldo_simpanan AS SELECT anggota_id, sum(jumlah) as jumlah FROM `t_simpan` WHERE is_active = 1 GROUP BY anggota_id");


    // cek apakah folder src ada
    fs.ensureDir(pathFile, err => {
      if(err) console.log(`Folder ${pathFile} Created`)
    });
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
