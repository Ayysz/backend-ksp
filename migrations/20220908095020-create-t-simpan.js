'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('t_simpan', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      no_simpan: {
        type: Sequelize.UUID
      },
      tanggal_simpan: {
        type: Sequelize.DATE
      },
      anggota_id: {
        type: Sequelize.INTEGER
      },
      jumlah: {
        type: Sequelize.DOUBLE
      },
      jenis_simpanan_id: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('t_simpan');
  }
};