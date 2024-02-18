"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Cart, {
        foreignKey: "customerId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      User.hasMany(models.Order, {
        foreignKey: "customerId",
      });
      User.hasMany(models.Post, {
        foreignKey: "userId",
      });
      User.hasMany(models.Comment, {
        foreignKey: "userId",
      });
      User.hasMany(models.Address, {
        foreignKey: "customerId",
      });
      User.hasMany(models.Prescription, {
        foreignKey: "customerId",
      });
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      avatar: DataTypes.STRING,
      phone: DataTypes.STRING,
      dob: DataTypes.DATE,
      gender: DataTypes.STRING,
      refreshToken: DataTypes.STRING,
      role: DataTypes.INTEGER,
      passwordChangeAt: DataTypes.DATE,
      passwordResetToken: DataTypes.STRING,
      passwordResetExpires: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
