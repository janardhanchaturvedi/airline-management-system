const { StatusCodes } = require("http-status-codes");
const { CityRepository } = require("../repositories");
const AppError = require("../utils/errors/app-errors");

const cityRepository = new CityRepository();

async function createCity(data) {
  try {
    const City = await cityRepository.create(data);
    return City;
  } catch (error) {
    if (
      error.name === `SequelizeValidationError` ||
      error.name === `SequelizeUniqueConstraintError`
    ) {
      let explanation = [];
      error.errors.forEach((e) => {
        explanation.push(e.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot create a new City object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getCities() {
  try {
    const Cities = await cityRepository.getAll();
    return Cities;
  } catch (error) {
    throw new AppError("Cannot get Citys", StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getCityById(id) {
  try {
    const City = await cityRepository.get(id);
    return City;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The City you requested is not present",
        error.statusCode
      );
    }
    throw new AppError(
      "Cannot fetch the data of the Citys",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function destroyCity(id) {
  try {
    const City = await cityRepository.destroy(id);
    if (!City) {
      throw new AppError(
        "The City your requested is not present",
        StatusCodes.NOT_FOUND
      );
    }
    return City;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The City you requested is not present",
        error.statusCode
      );
    }
    throw new AppError(
      "Cannot fetch the data of the Citys",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateCity(id, data) {
  try {
    const response = await cityRepository.update(id, data);
    if (!response) {
      throw new AppError(
        "Cannot Update the date of the City",
        StatusCodes.NOT_FOUND
      );
    }

    return response;
  } catch (error) {
    throw new AppError(
      "Cannot Update the data of the Citys",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  updateCity,
  destroyCity,
  getCityById,
  getCities,
  createCity,
};
