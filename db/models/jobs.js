'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    static associate(models) {
      // Many-to-One associations
      Job.belongsTo(models.Experience, {
        foreignKey: 'exp_id',
        as: 'jobExperience'
      });
      Job.belongsTo(models.Type, {
        foreignKey: 'type_id',
        as: 'jobType'
      });
      Job.belongsTo(models.Position, {
        foreignKey: 'position_id',
        as: 'jobPosition'
      });

      // Many-to-Many association with users through applications
      Job.belongsToMany(models.User, {
        through: 'Application',
        foreignKey: 'job_id',
        as: 'jobApplicant'
      });
    }
  }
  Job.init({
    title: DataTypes.STRING,
    job_desc: DataTypes.TEXT,
    requirement: DataTypes.TEXT,
    logo: DataTypes.STRING,
    quota: DataTypes.INTEGER,
    applicant: DataTypes.INTEGER,
    exp_id: DataTypes.INTEGER,
    type_id: DataTypes.INTEGER,
    position_id: DataTypes.INTEGER,
    closedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Job',
  });
  return Job;
};
