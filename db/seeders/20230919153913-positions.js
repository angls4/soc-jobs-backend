'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('positions', [
      {
        position_name: 'Frontend Developer',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        position_name: 'Backend Developer',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        position_name: 'Fullstack Developer',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        position_name: 'DevOps Engineer',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        position_name: 'Copy Writer',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        position_name: 'Content Manager',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        position_name: 'Data Analyst',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        position_name: 'UI/UX Designer',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        position_name: 'Software Engineer',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        position_name: 'Project Manager',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        position_name: 'Business Analyst',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        position_name: 'QA Engineer',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        position_name: 'Mobile Developer',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        position_name: 'Other',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      // Add more position data
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('positions', null, {});
  }
};
