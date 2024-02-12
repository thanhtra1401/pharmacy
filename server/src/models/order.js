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
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Order.belongsTo(models.User, {
        foreignKey: "customerId",
      });
      Order.belongsTo(models.Address, {
        foreignKey: "addressId",
      });
    }
  }
  Order.init(
    {
      customerId: DataTypes.INTEGER,
      addressId: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
      payment: DataTypes.INTEGER,
      howReceive: DataTypes.INTEGER,
      shipFee: DataTypes.DOUBLE,

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
