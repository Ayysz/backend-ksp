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
      nama_bank: 'BACA',
      is_active: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nama_bank: 'BINI',
      is_active: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nama_bank: 'SBI',
      is_active: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
   ];

   await queryInterface.bulkInsert('m_nama_bank', data, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('m_nama_bank', null, {});
  }
};
