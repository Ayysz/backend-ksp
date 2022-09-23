'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('m_bank', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama_bank_id: {
        type: Sequelize.INTEGER,
      },
      nama_pemilik_bank: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      jenis_kepemilikan_id: {
        type: Sequelize.INTEGER
      },
      no_rek: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('m_bank');
  }
};