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
      kategori_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Kategories",
          key: "id",
          as: "kategori_id",
        },
      },
      tahun_keluaran: {
        type: Sequelize.STRING,
      },
      warna: {
        type: Sequelize.STRING,
      },
      harga: {
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
    await queryInterface.dropTable("Products");
  },
};
