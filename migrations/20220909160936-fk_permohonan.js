'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    // add foreign key column pimpinan_id table t_permohonan
    await queryInterface.addConstraint('t_permohonan', {
      fields: ['pimpinan_id'],
      type: 'FOREIGN KEY',
      name: 'FK_pimpinan_id',
      references: {
        table: 'm_pegawai',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    // add foreign key coluum staff_id table t_permohonan
    await queryInterface.addConstraint('t_permohonan', {
      fields: ['staff_id'],
      type: 'FOREIGN KEY',
      name: 'FK_staff_id',
      references: {
        table: 'm_pegawai',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    // add foreign key column pinjam_id table t_permohonan
    await queryInterface.addConstraint('t_permohonan', {
      fields: ['pinjam_id'],
      type: 'FOREIGN KEY',
      name: 'FK_pinjam_id_permohonan',
      references: {
        table: 't_pinjam',
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
