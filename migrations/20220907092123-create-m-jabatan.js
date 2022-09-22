'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('m_jabatan', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      jabatan: {
        type: Sequelize.STRING
      },
      desc: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('m_jabatan');
  }
};