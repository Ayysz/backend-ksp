'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('log_permohonan', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      no_pinjam: {
        type: Sequelize.UUID
      },
      status: {
        type: Sequelize.STRING
      },
      oleh: {
        type: Sequelize.STRING
      },
      nama_pegawai: {
        type: Sequelize.STRING
      },
      tanggal_permohonan: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('log_permohonan');
  }
};