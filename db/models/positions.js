const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Position extends Model {
    static associate(models) {
      // Define associations here
      Position.hasMany(models.Job, {
        foreignKey: 'position_id',
        as: 'jobs'
      });
    }
  }
  
  Position.init({
    position_name: DataTypes.ENUM([
      'Frontend Developer', 'Backend Developer', 'Fullstack Developer', 'DevOps Engineer',
      'Copy Writer', 'Content Manager', 'Data Analyst', 'UI/UX Designer', 'Software Engineer', 'Project Manager', 'Business Analyst',
      'QA Engineer', 'Mobile Developer', 'Other'
    ])
  }, {
    sequelize,
    modelName: 'Position',
  });

  return Position;
};
