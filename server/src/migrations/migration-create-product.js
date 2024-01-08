"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      shortDes: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      price: {
        type: Sequelize.DOUBLE,
      },
      amount: {
        type: Sequelize.INTEGER,
      },
      intendedUse: {
        type: Sequelize.TEXT,
      },
      howToUse: {
        type: Sequelize.TEXT,
      },
      sideEffects: {
        type: Sequelize.TEXT,
      },
      origin: {
        type: Sequelize.STRING,
      },
      lotNumber: {
        type: Sequelize.INTEGER,
      },
      manufactureDate: {
        type: Sequelize.DATE,
      },
      expiriedDate: {
        type: Sequelize.DATE,
      },
      unit: {
        type: Sequelize.STRING,
      },
      categoryId: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("Products");
  },
};
