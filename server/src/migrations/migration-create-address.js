"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Addresses", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      customerId: {
        type: Sequelize.INTEGER,
      },
      province: {
        type: Sequelize.STRING,
      },
      provinceCode: {
        type: Sequelize.STRING,
      },
      district: {
        type: Sequelize.STRING,
      },
      districtCode: {
        type: Sequelize.STRING,
      },
      ward: {
        type: Sequelize.STRING,
      },
      wardCode: {
        type: Sequelize.STRING,
      },
      detail: {
        type: Sequelize.STRING,
      },
      defaultAddress: {
        type: Sequelize.BOOLEAN,
      },
      receiveName: {
        type: Sequelize.STRING,
      },
      receivePhone: {
        type: Sequelize.STRING,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Addresses");
  },
};
