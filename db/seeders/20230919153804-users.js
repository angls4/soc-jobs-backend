'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [
      {
        name: 'SOC Jobs Admin',
        email: 'admin@example.com',
        password: 'socadmin',
        avatar: 'avatar.png',
        gender: 'Male',
        role: 'Admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tegar Danardana Lokananta',
        email: 'tegar@example.com',
        password: '123',
        avatar: 'avatar-user.png',
        gender: 'Female',
        address: '456 Elm St',
        contact: '0812345678',
        cv: 'cv_url_here',
        role: 'User',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      // Add more user data
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
