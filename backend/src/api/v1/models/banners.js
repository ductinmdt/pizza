"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class banners extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  banners.init(
    {
      title: DataTypes.STRING,
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
      modelName: "banners",
      tableName: "banners",
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    }
  );
  return banners;
};
