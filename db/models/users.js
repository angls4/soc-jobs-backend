'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    static associate(models) {
      // Define the association
      users.belongsTo(models.roles, {
        foreignKey: 'role_id',
        as: 'role', // alias for the related role
      });
    }
  }
  users.init({
    name: DataTypes.STRING,
    role_id: DataTypes.INTEGER,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    profile_image: DataTypes.STRING,
    gender: DataTypes.ENUM,
    address: DataTypes.STRING,
    contact: DataTypes.INTEGER,
    cv: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};
