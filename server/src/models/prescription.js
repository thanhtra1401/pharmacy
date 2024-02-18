"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Prescription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Prescription.hasMany(models.PrescriptionDetail, {
        foreignKey: "prescriptionId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Prescription.belongsTo(models.User, {
        foreignKey: "customerId",
      });
    }
  }
  Prescription.init(
    {
      image: DataTypes.STRING,
      note: DataTypes.TEXT,
      customerId: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Prescription",
    }
  );
  return Prescription;
};
