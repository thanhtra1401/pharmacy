"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CartDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CartDetail.belongsTo(models.Product, {
        foreignKey: "productId",
      });
      CartDetail.belongsTo(models.Cart, {
        foreignKey: "cartId",
      });
    }
  }
  CartDetail.init(
    {
      cartId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      amount: DataTypes.INTEGER,
      selected: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "CartDetail",
    }
  );
  return CartDetail;
};
