"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      products.belongsTo(models.categories, {
        foreignKey: "category_id",
      })
      products.hasMany(models.comments, {
        foreignKey: "product_id",
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
  products.init(
    {

      cd:DataTypes.STRING,
      productName: DataTypes.STRING,
      description: DataTypes.TEXT,
      priceNew: DataTypes.DOUBLE,
      priceOld: DataTypes.DOUBLE,
      stock: DataTypes.INTEGER,
      url: DataTypes.STRING,
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
      modelName: "products",
      tableName: "products",
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    }
  );
  return products;
};
