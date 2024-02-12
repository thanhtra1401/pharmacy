"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.hasMany(models.CartDetail, {
        foreignKey: "cartId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Cart.belongsTo(models.User, {
        foreignKey: "customerId",
      });
    }
  }
  Cart.init(
    {
      customerId: DataTypes.INTEGER,
      totalPrice: DataTypes.DOUBLE,
    },
    {
      sequelize,
      modelName: "Cart",
    }
  );
  return Cart;
};
