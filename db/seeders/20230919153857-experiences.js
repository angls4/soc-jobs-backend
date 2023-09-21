'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('experiences', [
      {
        exp_desc: 'Kurang dari 1 tahun',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        exp_desc: '1 - 3 tahun',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        exp_desc: '4 - 5 tahun',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        exp_desc: '6 - 10 tahun',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        exp_desc: 'Lebih dari 10 tahun',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('experiences', null, {});
  }
};
