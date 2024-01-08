"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.hasMany(models.OrderDetail, {
        foreignKey: "orderId",
      });
      Order.belongsTo(models.User, {
        foreignKey: "customerId",
      });
    }
  }
  Order.init(
    {
      customerId: DataTypes.INTEGER,
      status: DataTypes.STRING,
      payment: DataTypes.STRING,
      totalPrice: DataTypes.DOUBLE,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
