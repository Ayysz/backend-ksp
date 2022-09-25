'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('t_attachment', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      file_name: {
        type: Sequelize.TEXT
      },
      refrence_table: {
        type: Sequelize.ENUM('transaksi','pinjam','simpan')
      },
      refrence_id: {
        type: Sequelize.INTEGER
      },
      anggota_id: {
        type: Sequelize.INTEGER
      },
      is_active: {
        defaultValue: 1,
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
    await queryInterface.dropTable('t_attachment');
  }
};