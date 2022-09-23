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
    for(let i = 0;i<4;i++){
      const reqData = {
        nama_bank_id: faker.helpers.arrayElement([1,2,3]),
        nama_pemilik_bank: faker.name.firstName(),
        jenis_kepemilikan_id: faker.helpers.arrayElement([1,2]),
        no_rek: faker.finance.creditCardNumber(),
        is_active: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      data.push(reqData);
    }

    await queryInterface.bulkInsert('m_bank', data, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('m_bank', null, {});
  }
};
