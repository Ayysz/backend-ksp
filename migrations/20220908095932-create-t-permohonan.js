'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('t_permohonan', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pinjam_id: {
        type: Sequelize.INTEGER
      },
      pimpinan_id: {
        type: Sequelize.INTEGER
      },
      staff_id: {
        type: Sequelize.INTEGER
      },
      tanggal_persetujuan: {
        type: Sequelize.DATEONLY
      },
      alasan: {
        type: Sequelize.TEXT
      },
      is_waiting: {
        defaultValue: 1,
        type: Sequelize.BOOLEAN
      },
      is_approve: {
        defaultValue: 0,
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('t_permohonan');
  }
};