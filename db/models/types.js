const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class types extends Model {
    static associate(models) {
      // Define associations here
      types.hasMany(models.jobs, { foreignKey: 'type_id', as: 'jobs' });
    }
  }
  
  types.init({
    job_type: DataTypes.ENUM
  }, {
    sequelize,
    modelName: 'types',
  });

  return types;
};
