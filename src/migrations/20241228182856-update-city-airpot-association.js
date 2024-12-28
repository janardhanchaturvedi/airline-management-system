"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("Airports", {
      type: "FOREIGN KEY",
      fields: ["city_id"],
      name: "city_fkey_constraints",
      references: {
        table: "Cities",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDELETE: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("Airports", "city_fkey_constraints");
  },
};
