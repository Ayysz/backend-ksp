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
     ];
     const password = [
      'admin123',
      'test123',
      'dummyyum13',
     ];
     const data = [];

     for(let i = 0; i < email.length; i++){
      //  const hash = await bycrypt.hash(faker.internet.password(), 10);
       const reqData = {
         email: email[i],
         password: password[i],
         role_id: i+1
       }
       data.push(reqData);
     }
    
    //  membuat akun untuk test
    await m_akun.create({
      email: "adamGrahamBell@gmail.com",
      password: "13102004",
      role_id: 1
    });

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

