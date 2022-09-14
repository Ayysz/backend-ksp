'use strict';
const {faker} = require('@faker-js/faker');

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
    for (let i = 0; i < 2; i++){
      const reqData = {
        no_pinjam: faker.datatype.uuid(),
        anggota_id: faker.helpers.arrayElement([1,2]),
        jumlah: faker.finance.amount(50,1000),
        tujuan: faker.lorem.sentence(3),
        tanggal_pinjam: new Date(),
        tanggal_pengembalian : faker.date.soon(10),
        is_active: 1,
        created_by: 'Admin',
        createdAt: new Date(),
        updated_by: 'Admin',
        updatedAt: new Date()
      };
      data.push(reqData);
    };

      await queryInterface.bulkInsert('t_pinjam', data, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('t_pinjam', null, {});
  }
};
