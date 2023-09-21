'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('applications', [
      {
        user_id: 1,
        job_id: 1,
        status: 'Pending',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 2,
        job_id: 1,
        status: 'Accepted',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 3,
        job_id: 2,
        status: 'Rejected',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 4,
        job_id: 2,
        status: 'Canceled',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('applications', null, {});
  }
};
