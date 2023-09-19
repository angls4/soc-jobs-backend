'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class roles extends Model {
    static associate(models) {
      // Define the association
      roles.hasMany(models.users, {
        foreignKey: 'role_id',
        as: 'users', // alias for the related users
      });
    }
  }
  roles.init({
    role_name: DataTypes.ENUM
  }, {
    sequelize,
    modelName: 'roles',
  });
  return roles;
};
