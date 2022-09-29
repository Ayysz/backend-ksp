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
    for(let i = 0;i < 4; i++){
      const reqData = {
        no_simpan: faker.datatype.uuid(),
        tanggal_simpan: new Date(),
        anggota_id: faker.helpers.arrayElement([1,2]),
        jumlah: faker.finance.amount(50,1000),
        jenis_simpanan_id: faker.helpers.arrayElement([1,2]),
        is_active: 1,
        created_by: 'Admin',
        createdAt: new Date(),
        updated_by: 'Admin',
        updatedAt: new Date()
      };
      data.push(reqData);
    }

    await queryInterface.bulkInsert('t_simpan', data, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('t_simpan', null, {});
  }
};
