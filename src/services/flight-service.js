const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-errors");
const { FlightRepository } = require("../repositories");

const flightRepository = new FlightRepository();
async function createFlight(data) {
  try {
    const flight = await flightRepository.create(data);
    return flight;
  } catch (error) {
    if (
      error.name === `SequelizeValidationError` ||
      `SequelizeUniqueConstraintError`
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

module.exports = {createFlight};
