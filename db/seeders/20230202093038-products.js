"use strict";

const kategori = ["1", "2", "3"];
const warna = ["merah", "putih", "biru"];
const tahun = "2020";
const harga = ["17000000", "15000000", "22000000"];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const timestamp = new Date();

    const Product = kategori.map((kategori, i) => ({
      // nama: kategori,
      kategori_id: kategori,
      tahun_keluaran: tahun,
      warna: warna[i],
      harga: harga[i],
      createdAt: timestamp,
      updatedAt: timestamp,
    }));

    await queryInterface.bulkInsert("Products", Product, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products");
  },
};
