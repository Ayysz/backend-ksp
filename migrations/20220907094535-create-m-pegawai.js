'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('m_pegawai', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      no_pegawai: {
        allowNull: false,
        type: Sequelize.STRING(13)
      },
      nama: {
        allowNull: false,
        type: Sequelize.STRING
      },
      no_hp: {
        allowNull: false,
        type: Sequelize.STRING(13)
      },
      no_ktp: {
        allowNull: false,
        type: Sequelize.STRING(16)
      },
      gender: {
        type: Sequelize.ENUM('pria', 'wanita')
      },
      tanggal_lahir: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      tempat_lahir: {
        type: Sequelize.STRING
      },
      alamat: {
        type: Sequelize.TEXT
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      jabatan_id: {
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
    await queryInterface.dropTable('m_pegawai');
  }
};