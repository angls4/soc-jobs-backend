'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Application extends Model {
    static associate(models) {
      // Many-to-Many association with users through jobs
      Application.belongsTo(models.Job, {
        foreignKey: 'job_id',
        as: 'Job'
      });
      Application.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'User'
      });
    }
  }
  Application.init({
    user_id: DataTypes.INTEGER,
    job_id: DataTypes.INTEGER,
    status: DataTypes.ENUM([
      'Pending', 'Accepted', 'Rejected', 'Canceled'
  ])
  }, {
    sequelize,
    modelName: 'Application',
  });
  return Application;
};
