'use strict';
const {faker}  = require('@faker-js/faker');

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
   const data = [];
   for (let i = 0; i < 5; i++){
    const reqData = {
      no_transaksi: faker.datatype.uuid(),
      jenis_transaksi_id: faker.helpers.arrayElement([1,2]),
      anggota_id: faker.helpers.arrayElement([1,2,3]),
      bank_id: faker.helpers.arrayElement([1,2,3]),
      tanggal_transaksi: faker.date.between('2018-01-01T00:00:00.000Z', '2021-01-01T00:00:00.000Z'),
      jumlah: faker.finance.amount(20, 1000),
      is_active: 1,
      created_by: 'Admin',
      createdAt: new Date(),
      updated_by: 'Admin',
      updatedAt: new Date()
    }
    data.push(reqData);
   }

   await queryInterface.bulkInsert('t_transaksi', data, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('t_transaksi', null, {});
  }
};
