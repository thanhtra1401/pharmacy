"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DiscountDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DiscountDetail.belongsTo(models.Product, {
        foreignKey: "productId",
      });
      DiscountDetail.belongsTo(models.Discount, {
        foreignKey: "discountId",
      });
    }
  }
  DiscountDetail.init(
    {
      minAmount: DataTypes.INTEGER,
      maxAmount: DataTypes.INTEGER,
      discountId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "DiscountDetail",
    }
  );
  return DiscountDetail;
};
