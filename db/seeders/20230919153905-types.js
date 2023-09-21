'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('types', [
      {
        job_type: 'Fulltime',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        job_type: 'Freelance',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        job_type: 'Internship',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('types', null, {});
  }
};
