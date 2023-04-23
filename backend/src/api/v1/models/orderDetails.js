"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class order_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      order_details.belongsTo(models.products, {
        foreignKey: "product_id",
      })
      order_details.belongsTo(models.orders, {
        foreignKey: "order_id",
      })
    }
  }
  order_details.init(
    {
      quantity: DataTypes.INTEGER,
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
      modelName: "order_details",
      tableName: "order_details",
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    }
  );
  return order_details;
};
