"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      orders.belongsTo(models.users, {
        foreignKey: "user_id",
      })
      // Users.hasMany(models.Employees, {
      //   foreignKey: "USER_ID",
      // })
      orders.hasMany(models.order_details, {
        foreignKey: "order_id",
      })
      // Users.belongsTo(models.Genders, {
      //   foreignKey: "GENDER_ID",
      // })
      // Users.belongsTo(models.User_Status, {
      //   foreignKey: "USER_STATUS_ID",
      // })
    }
  }
  orders.init(
    {
      status: DataTypes.STRING,
      cd: DataTypes.STRING,
      totalPrice: DataTypes.DOUBLE,
      phoneNumber: DataTypes.STRING,
      type_payment: DataTypes.INTEGER,
      note: DataTypes.TEXT,
      address: DataTypes.STRING,
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
      modelName: "orders",
      tableName: "orders",
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    }
  );
  return orders;
};
