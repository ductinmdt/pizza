"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      categories.hasMany(models.products, {
        foreignKey: "category_id",
      })
    }
  }
  categories.init(
    {
      categoryName: DataTypes.STRING,
      description: DataTypes.TEXT,
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
      modelName: "categories",
      tableName: "categories",
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    }
  );
  return categories;
};
