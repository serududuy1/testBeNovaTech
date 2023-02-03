"use strict";

const product = ["1", "2", "3"];
const stock = ["5", "2", "7"];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const timestamp = new Date();

    const Stock = product.map((product, i) => ({
      // nama: product,
      product_id: product,
      stock: stock[i],
      createdAt: timestamp,
      updatedAt: timestamp,
    }));

    await queryInterface.bulkInsert("Stocks", Stock, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Stocks");
  },
};
