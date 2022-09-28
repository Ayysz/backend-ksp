'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('log_simpans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      no_simpan: {
        type: Sequelize.STRING
      },
      anggota_id: {
        type: Sequelize.INTEGER
      },
      tanggal_simpan: {
        type: Sequelize.DATE
      },
      jumlah: {
        type: Sequelize.FLOAT
      },
      is_active: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('log_simpans');
  }
};