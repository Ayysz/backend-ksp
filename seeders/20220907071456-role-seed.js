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
      },
      {
        role: 'Pimpinan',
        desc: 'Role pimpinan role untuk mensetujui permohonan pinjam',
      },
      {
        role: 'Staff',
        desc: 'Role staff untuk berbagai staff perusahaan',
      },
      {
        role: 'Member',
        desc: 'Role member untuk para member kopeasi',
      },
      {
        role: 'Impostor',
        desc: 'AWARE WITH IMPOSTOR'
      }
      ];
      const base = [];
      for (let i = 0; i < data.length; i++) {
        
        const reqData = {
          role: data[i].role,
          desc: data[i].desc,
          createdAt: new Date(),
          updatedAt: new Date()
        }
        base.push(reqData);
      }

     await queryInterface.bulkInsert('m_role', base, {});
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
