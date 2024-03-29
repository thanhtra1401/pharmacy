"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Discount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Discount.hasMany(models.DiscountDetail, {
        foreignKey: "discountId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Discount.hasMany(models.OrderDetail, {
        foreignKey: "discountId",
      });
    }
  }
  Discount.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      discountPercent: DataTypes.DOUBLE,
      startAt: DataTypes.DATE,
      endAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Discount",
    }
  );
  return Discount;
};
