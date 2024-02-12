"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Address.belongsTo(models.User, {
        foreignKey: "customerId",
      });
      Address.hasMany(models.Order, {
        foreignKey: "addressId",
      });
    }
  }
  Address.init(
    {
      customerId: DataTypes.INTEGER,
      province: DataTypes.STRING,
      provinceCode: DataTypes.STRING,
      district: DataTypes.STRING,
      districtCode: DataTypes.STRING,
      ward: DataTypes.STRING,
      wardCode: DataTypes.STRING,
      detail: DataTypes.STRING,
      defaultAddress: DataTypes.BOOLEAN,
      receiveName: DataTypes.STRING,
      receivePhone: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Address",
    }
  );
  return Address;
};
