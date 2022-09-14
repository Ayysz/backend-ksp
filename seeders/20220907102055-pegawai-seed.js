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
      'test@gmail.com'
     ];

    const data = [];

    for(let i = 0; i < email.length; i++){
      const reqData = {
        no_pegawai: faker.random.numeric(13, {allowLeadingZeros: true}),
        nama: faker.name.firstName(),
        no_hp: faker.random.numeric(13, {allowLeadingZeros: true}),
        no_ktp: faker.random.numeric(13),
        gender: faker.helpers.arrayElement(['pria', 'wanita']),
        tanggal_lahir: faker.date.birthdate({min:17, max:34, mode:'age'}),
        tempat_lahir: faker.address.city(),
        alamat: faker.address.streetAddress(false),
        email: email[i],
        jabatan_id: faker.helpers.arrayElement([1,2,3]),
        is_active: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      data.push(reqData);
    };
    
    await queryInterface.bulkInsert('m_pegawai', data, {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('m_pegawai', null, {});
  }
};
