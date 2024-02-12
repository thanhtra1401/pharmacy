"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.hasMany(Category, {
        as: "children",
        foreignKey: "parentId",
      });
      Category.belongsTo(Category, {
        as: "parent",
        foreignKey: "parentId",
        parentId: DataTypes.INTEGER,
      });
      Category.hasMany(models.Product, {
        foreignKey: "categoryId",
      });
    }
  }
  Category.init(
    {
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
      description: DataTypes.STRING,
      parentId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};
