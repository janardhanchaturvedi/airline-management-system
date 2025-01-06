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
      onDelete: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("Airports", "city_fkey_constraints");
  },
};
/**
 * Query to check if constraint has been applied
 * select * from INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'airports' AND CONSTRAINT_SCHEMA = 'flights';
 */