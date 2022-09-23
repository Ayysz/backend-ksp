'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    
    
    // add foreign key column jenis_kepemilikan_id table m_bank
    await queryInterface.addConstraint('m_bank', {
      fields: ['jenis_kepemilikan_id'],
      type: 'FOREIGN KEY',
      name: 'FK_jenis_kepemilikan_id',
      references: {
        table: 'm_jenis_kepemilikan',
        field: 'id',
        as: 'jenisKepemilikan'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });

    // add foreign key column nama_bank_id table m_bank
    await queryInterface.addConstraint('m_bank', {
      fields: ['nama_bank_id'],
      type: 'FOREIGN KEY',
      name: 'FK_nama_bank_id',
      references: {
        table: 'm_nama_bank',
        field: 'id',
        as: 'namaBank'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
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
