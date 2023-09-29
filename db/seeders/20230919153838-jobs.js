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
        expId: 3,
        typeId: 2,
        positionId: 9,
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
        expId: 2,
        typeId: 1,
        positionId: 7,
        closedAt: new Date('2023-11-30'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Mobile App Designer',
        job_desc: 'We are looking for a talented UI/UX Designer to join our team.',
        requirement: 'Bachelor\'s degree in Computer Science and 1 years of experience using web design tool.',
        logo: 'soc-logo.png',
        quota: 3,
        applicant: 0,
        expId: 2,
        typeId: 1,
        positionId: 8,
        closedAt: new Date('2023-11-21'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Maintenance Server',
        job_desc: 'We are seeking a DevOps Engineer for maintenance our server.',
        requirement: 'Master\'s degree in Statistics or related field is required.',
        logo: 'soc-logo.png',
        quota: 2,
        applicant: 0,
        expId: 3,
        typeId: 2,
        positionId: 4,
        closedAt: new Date('2023-10-10'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'foreman to handle a project',
        job_desc: 'We are looking for a talented Project Manager to join our team.',
        requirement: 'Bachelor\'s degree in Computer Science and 5+ years of experience.',
        logo: 'soc-logo.png',
        quota: 5,
        applicant: 0,
        expId: 4,
        typeId: 1,
        positionId: 10,
        closedAt: new Date('2023-12-01'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Mobile App Developer',
        job_desc: 'We are seeking a Mobile Developer to Handle project from Client.',
        requirement: 'Master\'s degree in Statistics or related field is required.',
        logo: 'soc-logo.png',
        quota: 3,
        applicant: 0,
        expId: 1,
        typeId: 3,
        positionId: 13,
        closedAt: new Date('2023-11-30'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Software Quality Test',
        job_desc: 'We are looking for a talented QA Engineer to join our team.',
        requirement: 'Bachelor\'s degree in Computer Science and 10+ years of experience.',
        logo: 'soc-logo.png',
        quota: 4,
        applicant: 0,
        expId: 5,
        typeId: 2,
        positionId: 12,
        closedAt: new Date('2023-09-13'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Super visor for content teams',
        job_desc: 'We are seeking a Content Manager to lead our team and provide insights.',
        requirement: 'Master\'s degree in Statistics or related field is required.',
        logo: 'soc-logo.png',
        quota: 1,
        applicant: 0,
        expId: 3,
        typeId: 1,
        positionId: 6,
        closedAt: new Date('2023-10-23'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Improve Business',
        job_desc: 'We are looking for a Business Analyst to join our team.',
        requirement: 'Bachelor\'s degree in Computer Science and 1+ years of experience.',
        logo: 'soc-logo.png',
        quota: 6,
        applicant: 0,
        expId: 2,
        typeId: 1,
        positionId: 11,
        closedAt: new Date('2023-12-12'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Writing Content for Various Social Media Platforms',
        job_desc: 'We are seeking a Copy Writer for Manage content.',
        requirement: 'Master\'s degree in Statistics or related field is required.',
        logo: 'soc-logo.png',
        quota: 5,
        applicant: 0,
        expId: 1,
        typeId: 3,
        positionId: 5,
        closedAt: new Date('2023-09-13'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Implement existing designs and concepts on the web.',
        job_desc: 'We are seeking a Front End Developer.',
        requirement: 'Master\'s degree in Statistics or related field is required.',
        logo: 'soc-logo.png',
        quota: 3,
        applicant: 0,
        expId: 2,
        typeId: 2,
        positionId: 1,
        closedAt: new Date('2023-09-28'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'store and organize data and making sure Performance of a website.',
        job_desc: 'We are seeking a Back End Developer.',
        requirement: 'Master\'s degree in Statistics or related field is required.',
        logo: 'soc-logo.png',
        quota: 3,
        applicant: 0,
        expId: 1,
        typeId: 3,
        positionId: 2,
        closedAt: new Date('2023-10-02'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Create a website',
        job_desc: 'We are seeking a Full Stack Developer.',
        requirement: 'Master\'s degree in Statistics or related field is required.',
        logo: 'soc-logo.png',
        quota: 2,
        applicant: 0,
        expId: 2,
        typeId: 1,
        positionId: 5,
        closedAt: new Date('2023-10-08'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Camera Man',
        job_desc: 'We are seeking For a camera man for making video content.',
        requirement: 'Master\'s degree in Statistics or related field is required.',
        logo: 'soc-logo.png',
        quota: 2,
        applicant: 0,
        expId: 2,
        typeId: 1,
        positionId: 14,
        closedAt: new Date('2023-11-08'),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('jobs', null, {});
  }
};
