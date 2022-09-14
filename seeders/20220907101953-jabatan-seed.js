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

    for(let i = 0; i < 3; i++){
      const reqData = {
        jabatan: faker.word.adjective(5),
        desc: faker.lorem.words(4),
        is_active: faker.helpers.arrayElement([0,1]),
        createdAt: new Date(),
        updatedAt: new Date()
      }
      
      data.push(reqData);
    };

    await queryInterface.bulkInsert('m_jabatan', data, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('m_jabatan', null, {});
  }
};
