'use strict';

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
     const data = [
      {
        role: 'Admin',
        desc: 'Role admin yang paling tinggi dalam mengatur program',
        is_active: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        role: 'Pimpinan',
        desc: 'Role pimpinan role untuk mensetujui permohonan pinjam',
        is_active: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        role: 'Staff',
        desc: 'Role staff untuk berbagai staff perusahaan',
        is_active: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        role: 'Member',
        desc: 'Role member untuk para member kopeasi',
        is_active: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
     await queryInterface.bulkInsert('m_role', data, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('m_role', null, {});
  }
};
