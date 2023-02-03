"use strict";
const bcrypt = require("bcryptjs");
const names = ["adnan", "aris", "mila"];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const password = "123456";
    const encryptedPassword = bcrypt.hashSync(password, 10);
    const role = 1;
    const timestamp = new Date();

    const Users = names.map((names, i) => ({
      username: names,
      password: encryptedPassword,
      email: `${names}@mail.com`,
      role: role,
      createdAt: timestamp,
      updatedAt: timestamp,
    }));

    await queryInterface.bulkInsert("Users", Users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users");
  },
};
