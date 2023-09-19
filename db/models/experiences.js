const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class experiences extends Model {
    static associate(models) {
      // Define associations here
      experiences.hasMany(models.jobs, { foreignKey: 'exp_id', as: 'jobs' });
    }
  }
  
  experiences.init({
    exp_desc: DataTypes.ENUM
  }, {
    sequelize,
    modelName: 'experiences',
  });

  return experiences;
};
