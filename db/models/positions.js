const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class positions extends Model {
    static associate(models) {
      // Define associations here
      positions.hasMany(models.jobs, { foreignKey: 'position_id', as: 'jobs' });
    }
  }
  
  positions.init({
    position_name: DataTypes.ENUM
  }, {
    sequelize,
    modelName: 'positions',
  });

  return positions;
};
