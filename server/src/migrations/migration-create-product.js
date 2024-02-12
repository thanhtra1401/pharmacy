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
      slug: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
      shortDes: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      priceWithDiscount: {
        type: Sequelize.DOUBLE,
      },
      price: {
        type: Sequelize.DOUBLE,
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      sold: {
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
      country: {
        type: Sequelize.STRING,
      },
      ingredient: {
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
