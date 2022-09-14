'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    
    // add foreign key column role_id table m_akun
    await queryInterface.addConstraint('m_akun', {
      fields: ['role_id'],
      type: 'FOREIGN KEY',
      name: 'FK_role_id',
      references: {
        table: 'm_role',
        field: 'id',
        as: 'role_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    // add unique key column email table m_akun
    await queryInterface.addConstraint('m_akun', {
      fields: ['email'],
      type: 'UNIQUE',
      name: 'unique_email'
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
