'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('jobs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      job_desc: {
        type: Sequelize.TEXT('long')
      },
      requirement: {
        type: Sequelize.TEXT('long')
      },
      logo: {
        type: Sequelize.STRING
      },
      quota: {
        type: Sequelize.INTEGER
      },
      applicant: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      exp_id: {
        type: Sequelize.INTEGER
      },
      type_id: {
        type: Sequelize.INTEGER
      },
      position_id: {
        type: Sequelize.INTEGER
      },
      closedAt: {
        allowNull: false,
        type: Sequelize.DATE
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
    await queryInterface.dropTable('jobs');
  }
};