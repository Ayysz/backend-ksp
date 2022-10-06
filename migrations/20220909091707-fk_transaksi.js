'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    
    // add foregin key column bank_id table t_transaksi
    await queryInterface.addConstraint('t_transaksi', {
      fields: ['bank_id'],
      type: 'FOREIGN KEY',
      name: 'FK_bank_id_transaksi',
      references: {
        table: 'm_bank',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    // add foreign key column jenis_transaksi_id table t_transaksi
    await queryInterface.addConstraint('t_transaksi', {
      fields: ['jenis_transaksi_id'],
      type: 'FOREIGN KEY',
      name: 'FK_jenis_transaksi',
      references: {
        table: 'm_jenis_transaksi',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    // add foreign key column anggota_id table t_transaksi
    await queryInterface.addConstraint('t_transaksi', {
      fields: ['anggota_id'],
      type: 'FOREIGN KEY',
      name: 'FK_anggota_id_transaksi',
      references: {
        table: 'm_anggota',
        field: 'id',
        as: 'anggota'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    // add foreign key column pinjaman_id table t_transaksi
    await queryInterface.addConstraint('t_transaksi', {
      fields: ['pinjaman_id'],
      type: 'FOREIGN KEY',
      name: 'FK_pinjaman_id_transaksi',
      references: {
        table: 't_pinjam',
        field: 'id'
      }
    })
    
    // add foreign key column jenis_simpan_id table t_transaksi
    await queryInterface.addConstraint('t_transaksi', {
      fields: ['jenis_simpanan_id'],
      type: 'FOREIGN KEY',
      name: 'FK_jenis_simpan_transaksi',
      references: {
        table: 'm_jenis_simpanan',
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
