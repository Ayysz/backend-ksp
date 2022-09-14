'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('t_pinjam', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      no_pinjam: {
        type: Sequelize.UUID
      },
      anggota_id: {
        type: Sequelize.INTEGER
      },
      jumlah: {
        type: Sequelize.DOUBLE
      },
      tujuan: {
        type: Sequelize.TEXT
      },
      tanggal_pinjam: {
        type: Sequelize.DATE
      },
      tanggal_pengembalian: {
        type: Sequelize.DATE
      },
      is_active: {
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
    await queryInterface.dropTable('t_pinjam');
  }
};