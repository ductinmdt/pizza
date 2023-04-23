"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      comments.belongsTo(models.products, {
        foreignKey: "product_id",
      })
      comments.belongsTo(models.users, {
        foreignKey: "user_id",
      })
      // Users.hasMany(models.Employees, {
      //   foreignKey: "USER_ID",
      // })
      // Users.belongsTo(models.Orgs, {
      //   foreignKey: "ORG_ID",
      // })
      // Users.belongsTo(models.Genders, {
      //   foreignKey: "GENDER_ID",
      // })
      // Users.belongsTo(models.User_Status, {
      //   foreignKey: "USER_STATUS_ID",
      // })
    }
  }
  comments.init(
    {
      rate: DataTypes.INTEGER,
      description: DataTypes.TEXT,
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
      modelName: "comments",
      tableName: "comments",
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    }
  );
  return comments;
};
