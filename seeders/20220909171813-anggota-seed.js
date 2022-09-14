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
     const email = [
      'admin@gmail.com',
      'test@gmail.com',
      'dummy@gmail.com',
     ];

    const data = [];

    for(let i = 0; i < email.length; i++){
      const reqData = {
        no_anggota: faker.random.numeric(13, {allowLeadingZeros: true}),
        nama: faker.name.firstName(),
        no_hp: faker.random.numeric(13, {allowLeadingZeros: true}),
        no_ktp: faker.random.numeric(13),
        gender: faker.helpers.arrayElement(['pria', 'wanita']),
        tanggal_lahir: faker.date.birthdate({min:17, max:34, mode:'age'}),
        tempat_lahir: faker.address.city(),
        alamat: faker.address.streetAddress(false),
        email: email[i],
        pekerjaan_id: faker.helpers.arrayElement([1,2,3]),
        bank_id: faker.helpers.arrayElement([1,2,3]),
        is_waiting: 1,
        is_approve: 0,
        is_active: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      data.push(reqData);
    };
    
    await queryInterface.bulkInsert('m_anggota', data, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('m_anggota', null, {});
  }
};
