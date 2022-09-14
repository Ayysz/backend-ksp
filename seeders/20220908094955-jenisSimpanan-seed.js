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
    const jenis = [
      'Pokok',
      'Wajib',
      'Sukarela',
      'Berjangka'
    ];

    const data = [];
    for (let i = 0; i < jenis.length; i++){
      const reqData = {
        jenis_simpanan: jenis[i],
        is_active: 1,
        createdAt: new Date(),
        created_by: 'Admin',
        updatedAt: new Date(),
        updated_by: 'Admin'
      };
      data.push(reqData);
    }

   await queryInterface.bulkInsert('m_jenis_simpanan', data ,{});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('m_jenis_simpanan', null, {});
  }
};
