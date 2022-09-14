'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    // add foreign key column anggota_id table t_simpan
    await queryInterface.addConstraint('t_pinjam', {
      fields: ['anggota_id'],
      type: 'FOREIGN KEY',
      name: 'FK_anggota_id_pinjam',
      references: {
        table: 'm_anggota',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })

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
