'use strict';
const bycrypt = require('bcryptjs');
const {faker} = require('@faker-js/faker');
const models = require('../models');
const m_akun = models.m_akun;

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
     const email = [
      'admin@gmail.com',
      'test@gmail.com',
      'dummy@gmail.com',
      'pokemon@gmail.com'
     ];
     const data = [];

     for(let i = 0; i < email.length; i++){
      //  const hash = await bycrypt.hash(faker.internet.password(), 10);
       const reqData = {
         email: email[i],
         password: faker.internet.password(),
         role_id: faker.helpers.arrayElement([1,2,3,4]),
         is_active: 1,
         createdAt: new Date(),
         updatedAt: new Date()
       }
       data.push(reqData);
     }
     
     return await m_akun.bulkCreate(data, {});
    // await queryInterface.bulkInsert('m_akun', data, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('m_akun', null, {});
  }
};

