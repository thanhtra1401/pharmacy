"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class IngredientDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      IngredientDetail.belongsTo(models.Ingredient, {
        foreignKey: "ingredientId",
      });
      IngredientDetail.belongsTo(models.Product, {
        foreignKey: "productId",
      });
    }
  }
  IngredientDetail.init(
    {
      ingredientId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      content: DataTypes.DOUBLE,
      unit: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "IngredientDetail",
    }
  );
  return IngredientDetail;
};
