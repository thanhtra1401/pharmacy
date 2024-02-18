"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PrescriptionDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PrescriptionDetail.belongsTo(models.Prescription, {
        foreignKey: "prescriptionId",
      });
      PrescriptionDetail.belongsTo(models.Product, {
        foreignKey: "productId",
      });
    }
  }
  PrescriptionDetail.init(
    {
      prescriptionId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      amount: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "PrescriptionDetail",
    }
  );
  return PrescriptionDetail;
};
