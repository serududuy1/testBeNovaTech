"use strict";

const names = ["Samsung A33", "Samsung A53", "Samsung J2 Prime"];
const namepy = ["sad", "fdg", "jhk"];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const description = "hp samsung paling laris dah pokoknya";
    const timestamp = new Date();

    const Kategori = names.map((names, i) => ({
      nama: names,
      deskripsi: namepy[i],
      createdAt: timestamp,
      updatedAt: timestamp,
    }));

    await queryInterface.bulkInsert("Kategories", Kategori, {});
  },

  async down(queryInterface, Sequelize) {},
};
