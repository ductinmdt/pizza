"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class roles extends Model {
    static associate(models) {
      roles.hasMany(models.users, {
        foreignKey: "role_id",
      })
    }
  }
  roles.init(
    {
      cd: DataTypes.STRING,
      name: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      createdBy: DataTypes.INTEGER,
      updatedAt: DataTypes.DATE,
      ModifiedBy: DataTypes.INTEGER,
      is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "roles",
      tableName: "roles",
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    }
  );
  return roles;
};
