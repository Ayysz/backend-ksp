'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    // add foreign key column jabatan_id table m_pegawai
    await queryInterface.addConstraint('m_pegawai', {
      fields: ['jabatan_id'],
      type: 'FOREIGN KEY',
      name: 'FK_jabatan_id',
      references: {
        table: 'm_jabatan',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    // add foreign key column email table m_pegawai
    await queryInterface.addConstraint('m_pegawai', {
      fields: ['email'],
      type: 'FOREIGN KEY',
      name: 'FK_email_pegawai',
      references: {
        table: 'm_akun',
        field: 'email',
        unique: true,
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
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
