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
    for (let i = 0; i < 3;i++){
      const reqData = {
        pekerjaan: faker.name.jobTitle(),
        desc: faker.lorem.sentence(5),
        is_active: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      data.push(reqData);
    }

    await queryInterface.bulkInsert('m_pekerjaan', data, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('m_pekerjaan', null, {});
  }
};
