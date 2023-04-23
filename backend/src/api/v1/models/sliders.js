"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class sliders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  sliders.init(
    {
      title: DataTypes.STRING,
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
      modelName: "sliders",
      tableName: "sliders",
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    }
  );
  return sliders;
};
