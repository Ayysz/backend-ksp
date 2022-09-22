'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('t_transaksi', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      no_transaksi: {
        type: Sequelize.UUID
      },
      anggota_id: {
        type: Sequelize.INTEGER
      },
      jenis_transaksi_id: {
        type: Sequelize.INTEGER
      },
      bank_id: {
        type: Sequelize.INTEGER
      },
      tanggal_transaksi: {
        type: Sequelize.DATEONLY,
      },
      jumlah: {
        type: Sequelize.DOUBLE
      },
      is_active: {
        defaultValue: 1,
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      created_by:{
        allowNull: false,
        type: Sequelize.STRING
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_by:{
        allowNull: false,
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('t_transaksi');
  }
};