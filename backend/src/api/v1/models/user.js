"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Users.belongsToMany(models.Roles, {
      //   through: "User_Role",
      //   foreignKey: "USER_ID",
      // })
      users.hasMany(models.orders, {
        foreignKey: "user_id",
      })
      users.hasMany(models.comments, {
        foreignKey: "user_id",
      })
      users.belongsTo(models.roles, {
        foreignKey: "role_id",
      })
    }
  }
  users.init(
    {
      fullname: DataTypes.STRING,
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      birthday: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
      address: DataTypes.STRING,
      phone: DataTypes.STRING,
      avatar: DataTypes.STRING,
      gender: DataTypes.STRING,
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
      modelName: "users",
      tableName: "users",
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    }
  );
  return users;
};
