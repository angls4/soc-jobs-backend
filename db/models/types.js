const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Type extends Model {
    static associate(models) {
      // Define associations here
      Type.hasMany(models.Job, {
        foreignKey: 'type_id',
        as: 'jobs'
      });
    }
  }
  
  Type.init({
    job_type: DataTypes.ENUM([
      'Fulltime', 'Freelance', 'Internship'
    ])
  }, {
    sequelize,
    modelName: 'Type',
  });

  return Type;
};
