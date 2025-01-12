const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-errors");
const { FlightRepository } = require("../repositories");
const { Op } = require("sequelize");

const flightRepository = new FlightRepository();
async function createFlight(data) {
  try {
    const flight = await flightRepository.create(data);
    return flight;
  } catch (error) {
    if (
      error.name === `SequelizeValidationError` ||
      `SequelizeUniqueConstraintError` ||
      "SequelizeForeignKeyConstraintError"
    ) {
      let explanation = [];
      error?.errors?.forEach((e) => {
        explanation.push(e.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot create a new Airplane object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAllFlights(query) {
  let customFilters = {};

  if (query.trips) {
    const trip = query.trips;
    const [soureAirportId, destinationAirportId] = trip.split("-");
    customFilters.arrivalAirportId = destinationAirportId;
    customFilters.departureAirportId = soureAirportId;
    if (soureAirportId == destinationAirportId) {
      throw new AppError(
        "Source Airport and destination Airport Can't be same",
        StatusCodes.BAD_REQUEST
      );
    }
  }
  if (query.price) {
    const [startPrice, EndingPrice] = query.price.split("-");
    const price = {
      [Op.gte]: startPrice,
      [Op.lte]: [EndingPrice === undefined ? 20000 : EndingPrice],
    };
    customFilters.price = price;
  }
  try {
    const flights = flightRepository.getAllFlights(customFilters);
    return flights;
  } catch (error) {
    throw new AppError(
      "Cannot fetch all data of the flights",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = { createFlight, getAllFlights };
