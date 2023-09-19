'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class applications extends Model {
    static associate(models) {
      // Many-to-Many association with jobs through users
      applications.belongsTo(models.jobs, { foreignKey: 'job_id', as: 'job' });
      applications.belongsTo(models.users, { foreignKey: 'user_id', as: 'applicant' });
    }
  }
  applications.init({
    user_id: DataTypes.INTEGER,
    job_id: DataTypes.INTEGER,
    status: DataTypes.ENUM
  }, {
    sequelize,
    modelName: 'applications',
  });
  return applications;
};
