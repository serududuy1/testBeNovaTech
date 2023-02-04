"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Penjualans", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      tanggal_transaksi: {
        type: Sequelize.DATE,
      },
      product_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Stocks",
          key: "id",
          as: "stock_id",
        },
        onDelete: "cascade",
      },
      quantity: {
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
    await queryInterface.dropTable("Penjualans");
  },
};
