'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('positions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      position_name: {
        type: Sequelize.ENUM(
          'Frontend Developer', 'Backend Developer', 'Fullstack Developer', 'DevOps Engineer',
          'Copy Writer', 'Content Manager', 'Data Analyst', 'UI/UX Designer', 'Software Engineer', 'Project Manager', 'Business Analyst',
          'QA Engineer', 'Mobile Developer', 'Other'
          )
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('positions');
  }
};