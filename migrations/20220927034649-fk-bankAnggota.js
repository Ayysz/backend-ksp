'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    // add foreign key column anggota_id table m_bankAnggota
    await queryInterface.addConstraint('m_bankAnggota', {
      fields: ['anggota_id'],
      type: 'FOREIGN KEY', 
      name: 'FK_anggota_id_bankAnggota',
      references: {
        table: 'm_anggota',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });

    // add foreign key column bank_id table m_bankAnggota
    await queryInterface.addConstraint('m_bankAnggota', {
      fields: ['bank_id'],
      type: 'FOREIGN KEY',
      name: 'FK_bank_id_bankAnggota',
      references: {
        table: 'm_bank',
        field: 'id'
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
