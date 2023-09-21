const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Experience extends Model {
    static associate(models) {
      // Define associations here
      Experience.hasMany(models.Job, {
        foreignKey: 'exp_id',
        as: 'jobs'
      });
    }
  }
  
  Experience.init({
    exp_desc: DataTypes.ENUM([
      'Kurang dari 1 tahun', '1 - 3 tahun',
      '4 - 5 tahun', '6 - 10 tahun', 'Lebih dari 10 tahun'
    ])
  }, {
    sequelize,
    modelName: 'Experience',
  });

  return Experience;
};
