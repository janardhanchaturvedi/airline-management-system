'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const cities = await queryInterface.sequelize.query(
      'SELECT id from Cities;'
    );
    const cityRows = cities[0];

    await queryInterface.bulkInsert('Airports', [
      {
        name: 'Chhatrapati Shivaji International Airport',
        code: 'BOM',
        address: 'Mumbai, Maharashtra',
        cityId: cityRows[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Indira Gandhi International Airport',
        code: 'DEL',
        address: 'Delhi',
        cityId: cityRows[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Kempegowda International Airport',
        code: 'BLR',
        address: 'Bangalore, Karnataka',
        cityId: cityRows[2].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Airports', null, {});
  }
}; 