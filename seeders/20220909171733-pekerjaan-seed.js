'use strict';
const {faker}  = require('@faker-js/faker');
const Models = require('../models');
const m_pekerjaan = Models.m_pekerjaan;

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

    // dummy data
    await m_pekerjaan.create({
      pekerjaan: 'project manager',
      desc: 'Who handle all project in company'
    });

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
