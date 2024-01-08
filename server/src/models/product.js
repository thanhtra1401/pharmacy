"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.DiscountDetail, {
        foreignKey: "productId",
      });
      Product.hasMany(models.ImageProduct, {
        foreignKey: "productId",
      });
      Product.belongsTo(models.Category, {
        foreignKey: "categoryId",
      });
      Product.hasMany(models.CartDetail, {
        foreignKey: "productId",
      });
      Product.hasMany(models.OrderDetail, {
        foreignKey: "productId",
      });
      Product.hasMany(models.IngredientDetail, {
        foreignKey: "productId",
      });
      Product.hasMany(models.Comment, {
        foreignKey: "productId",
      });
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      shortDes: DataTypes.STRING,
      description: DataTypes.TEXT,
      price: DataTypes.DOUBLE,
      amount: DataTypes.INTEGER,
      intendedUse: DataTypes.TEXT,
      howToUse: DataTypes.TEXT,
      sideEffects: DataTypes.TEXT,
      origin: DataTypes.STRING,
      lotNumber: DataTypes.INTEGER,
      manufactureDate: DataTypes.DATE,
      expiriedDate: DataTypes.DATE,
      unit: DataTypes.STRING,
      categoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
