"use strict";
const { Op } = require("sequelize");
const product = ["1", "2", "3", "2", "3"];
const qtt = ["10", "22", "13", "7", "3"];
const harga = ["17000000", "15000000", "22000000", "15000000", "22000000"];
const bulan = [
  "2023-02-03",
  "2023-02-03",
  "2023-01-01",
  "2023-01-01",
  "2023-01-01",
];
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const timestamp = new Date();
    const Penjualans = product.map((product, i) => ({
      product_id: product,
      quantity: qtt[i],
      tanggal_transaksi: bulan[i],
      total_harga: parseInt(harga[i] * qtt[i]),
      createdAt: timestamp,
      updatedAt: timestamp,
    }));

    await queryInterface.bulkInsert("Penjualans", Penjualans, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Penjualans");
  },
};
