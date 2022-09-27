'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('m_anggota', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      no_anggota: {
        allowNull: false,
        type: Sequelize.STRING(13),
      },
      nama: {
        type: Sequelize.STRING
      },
      no_ktp: {
        allowNull: false,
        type: Sequelize.STRING(16),
      },
      no_hp: {
        allowNull: false,
        type: Sequelize.STRING(13),
      },
      gender: {
        type: Sequelize.ENUM('pria', 'wanita')
      },
      tanggal_lahir: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      tempat_lahir: {
        type: Sequelize.STRING
      },
      alamat: {
        type: Sequelize.TEXT
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      pekerjaan_id: {
        type: Sequelize.INTEGER
      },
      is_waiting: {
        type: Sequelize.BOOLEAN,
        defaultValue: 1,
      },
      is_approve: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: 1
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
    await queryInterface.dropTable('m_anggota');
  }
};