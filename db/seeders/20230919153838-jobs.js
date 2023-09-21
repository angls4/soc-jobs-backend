'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('jobs', [
      {
        title: 'Software Engineer',
        job_desc: 'We are looking for a talented Software Engineer to join our team.',
        requirement: 'Bachelor\'s degree in Computer Science and 3+ years of experience using Laravel.',
        logo: 'soc-logo.png',
        quota: 5,
        applicant: 0,
        exp_id: 3,
        type_id: 2,
        position_id: 9,
        closedAt: new Date('2023-12-31'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Data Analyst',
        job_desc: 'We are seeking a Data Analyst to analyze data and provide insights.',
        requirement: 'Master\'s degree in Statistics or related field is required.',
        logo: 'soc-logo.png',
        quota: 3,
        applicant: 0,
        exp_id: 2,
        type_id: 1,
        position_id: 7,
        closedAt: new Date('2023-11-30'),
        createdAt: new Date(),
        updatedAt: new Date()
      }
      // Add more job data
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('jobs', null, {});
  }
};
