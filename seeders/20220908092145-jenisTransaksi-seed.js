'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   const data = [
    {
      jenis_transaksi: 'Penarikan',
      is_active: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      jenis_transaksi: 'Pengembalian',
      is_active: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
   ];

   await queryInterface.bulkInsert('m_jenis_transaksi', data, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('m_jenis_transaksi', null, {});
  }
};
