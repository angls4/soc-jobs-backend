'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class jobs extends Model {
    static associate(models) {
      // Many-to-One associations
      jobs.belongsTo(models.experiences, { foreignKey: 'exp_id', as: 'experience' });
      jobs.belongsTo(models.types, { foreignKey: 'type_id', as: 'jobType' });
      jobs.belongsTo(models.positions, { foreignKey: 'position_id', as: 'jobPosition' });

      // Many-to-Many association with users through applications
      jobs.belongsToMany(models.users, {
        through: models.applications,
        foreignKey: 'job_id',
        as: 'applicants',
      });
    }
  }
  jobs.init({
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
    modelName: 'jobs',
  });
  return jobs;
};
