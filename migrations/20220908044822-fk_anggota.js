'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    // add foreign key column pekerjaan_id table m_anggota
    // await queryInterface.addConstraint('m_anggota', {
    //   fields: ['pekerjaan_id'],
    //   type: 'FOREIGN KEY',
    //   name: 'FK_pekerjaan_id',
    //   references: {
    //     table: 'm_pekerjaan',
    //     field: 'id',
    //   },
    //   onUpdate: 'CASCADE',
    //   onDelete: 'CASCADE'
    // });

    // // add foreign key column bank_id table m_anggota
    // await queryInterface.addConstraint('m_anggota', {
    //   fields: ['bank_id'],
    //   type: 'FOREIGN KEY',
    //   name: 'FK_bank_id_anggota',
    //   references: {
    //     table: 'm_bank',
    //     field: 'id',
    //   },
    //   onUpdate: 'CASCADE',
    //   onDelete: 'CASCADE'
    // });

    // add foreign key column email table m_anggota
    await queryInterface.addConstraint('m_anggota', {
      fields: ['email'],
      type: 'FOREIGN KEY',
      name: 'FK_email_anggota',
      references: {
        table: 'm_akun',
        field: 'email',
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
