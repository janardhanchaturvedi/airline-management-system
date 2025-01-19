'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Cities', [
      {
        name: 'New York',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Delhi',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bangalore',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Hyderabad',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cities', null, {});
  }
}; 