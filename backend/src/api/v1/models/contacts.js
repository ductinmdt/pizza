"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class contacts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  contacts.init(
    {
      fullname: DataTypes.STRING,
      // username: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
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
      modelName: "contacts",
      tableName: "contacts",
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    }
  );
  return contacts;
};
