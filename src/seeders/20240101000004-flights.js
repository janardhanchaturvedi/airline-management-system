'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const airports = await queryInterface.sequelize.query(
      'SELECT code, id from Airports;'
    );
    const airportRows = airports[0];

    const airplanes = await queryInterface.sequelize.query(
      'SELECT id from Airplanes;'
    );
    const airplaneRows = airplanes[0];

    await queryInterface.bulkInsert('Flights', [
      {
        flightNumber: 'AI-101',
        airplainId: airplaneRows[0].id,
        departureAirportId: airportRows[0].code,
        arrivalAirportId: airportRows[1].code,
        arrivalTime: new Date(2024, 0, 1, 12, 0),
        departureTime: new Date(2024, 0, 1, 10, 0),
        price: 5000,
        boardingGate: 'A1',
        totalSeats: 180,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "flightNumber": "CZI02445" ,
        "airplainId": 2,
        "departureAirportId": "VNS",
        "arrivalAirportId": "STV",
        "arrivalTime": "2025-01-12 16:34:08" ,
        "departureTime": "2025-01-12 20:44:08" ,
        "price": 11000,
        "boardingGate": "1A",
        "totalSeats": 250 
      },
      {
        flightNumber: 'AI-102',
        airplainId: airplaneRows[1].id,
        departureAirportId: airportRows[1].code,
        arrivalAirportId: airportRows[2].code,
        arrivalTime: new Date(2024, 0, 1, 15, 0),
        departureTime: new Date(2024, 0, 1, 13, 0),
        price: 6000,
        boardingGate: 'B2',
        totalSeats: 160,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Flights', null, {});
  }
}; 