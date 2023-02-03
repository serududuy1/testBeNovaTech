"use strict";

const names = ["SAMSUNG", "XIAOMI", "APPLE"];
const des = ["Samsung Z Fold", "REDMI NOTE 11", "IPHONE 14Pro"];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const timestamp = new Date();

    const Kategori = names.map((names, i) => ({
      nama: names,
      deskripsi: des[i],
      createdAt: timestamp,
      updatedAt: timestamp,
    }));

    await queryInterface.bulkInsert("Kategories", Kategori, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Kategories");
  },
};
