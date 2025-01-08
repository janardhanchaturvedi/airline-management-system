const { StatusCodes } = require("http-status-codes");
const { AirportRepository } = require("../repositories");
const AppError = require("../utils/errors/app-errors");
const airportRepository = new AirportRepository();

async function createAirport(data) {
  try {
    const airpots = await airportRepository.create(data);
    return airpots;
  } catch (error) {
    if (error.name === `SequelizeValidationError`|| `SequelizeUniqueConstraintError`) {
      let explanation = [];
      error.errors.forEach((e) => {
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

async function getAirports() {
  try {
    const airports = await airportRepository.getAll();
    return airports;
  } catch (error) {
    throw new AppError(
      "Cannot get airports",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirportById(id) {
  try {
    const airport = await airportRepository.get(id);
    return airport;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The Airpot you requested is not present",
        error.statusCode
      );
    }
    throw new AppError(
      "Cannot fetch the data of the airpots",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function destroyAirport(id) {
  try {
    const airport = await airportRepository.destroy(id);
    if (!airport) {
      throw new AppError(
        "The Airport your requested is not present",
        StatusCodes.NOT_FOUND
      );
    }
    return airport;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The Airports you requested is not present",
        error.statusCode
      );
    }
    throw new AppError(
      "Cannot fetch the data of the airports",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateAirport(id, data) {
  try {
    const response = await airportRepository.update(id, data);
    if (!response) {
      throw new AppError(
        "Cannot Update the date of the airport",
        StatusCodes.NOT_FOUND
      );
    }

    return response;
  } catch (error) {
    throw new AppError(
      "Cannot Update the data of the airplanes",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
    createAirport,
  getAirports,
  getAirportById,
  destroyAirport,
  updateAirport,
};
