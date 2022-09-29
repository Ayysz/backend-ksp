'use strict';
const {faker} = require('@faker-js/faker');
const { sequelize } = require('../models');
const models = require('../models');
const t_permohonan = models.t_permohonan;

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
    let transaction;
    try {
      transaction = await sequelize.transaction();
      for (let i = 0; i < 3; i++){
      const reqData = {
        pinjam_id: faker.helpers.arrayElement([1,2]),
        pimpinan_id: faker.helpers.arrayElement([1,2]),
        staff_id: faker.helpers.arrayElement([1,2]),
        tanggal_persetujuan: faker.date.soon(2),
        alasan: faker.lorem.sentence(5),
        is_waiting: faker.helpers.arrayElement([0,1]),
        is_approve: faker.helpers.arrayElement([0,1]),
        is_active: faker.helpers.arrayElement([0,1]),
        created_by: 'Admin',
        createdAt: new Date(),
        updated_by: 'Admin',
        updatedAt: new Date(),
      }
      data.push(reqData);
      await t_permohonan.create(reqData, {transaction});
    } 
    console.log('success');
    await transaction.commit();
    
    } catch (error) {
      console.log(error.message);
      if(transaction){
        await transaction.rollback();
      }
    }


  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('t_permohonan', null, {});
  }
};
