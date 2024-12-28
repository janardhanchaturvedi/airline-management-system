const { StatusCodes } = require("http-status-codes");
// const { CityService } = require("../services");
const { error } = require("winston");
const { SuccessResponse, ErrorResponse } = require("../utils/common/index");
const { CityService } = require("../services");

/**
 * POST : /airplanes
 * req-body : {name  : 'London' }
 */
async function createCity(req, res) {
  try {
    const city = await CityService.createCity({
      name: req.body.name,
    });
    SuccessResponse.data = city;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getCities(req, res) {
  try {
    const cities = await CityService.getCities();
    SuccessResponse.data = cities;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getCityById(req, res) {
  try {
    const cities = await CityService.getCityById(req.params.id);
    SuccessResponse.data = cities;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function destroyCity(req, res) {
  try {
    const destroyedCity = await CityService.destroyCity(req.params.id);
    SuccessResponse.data = destroyedCity;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function updateCity(req, res) {
  const { id } = req.params;
  const data = req.body;
  try {
    const updateCity = await CityService.updateCity(id, data);
    SuccessResponse.data = updateCity;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  createCity,
  getCities,
  getCityById,
  destroyCity,
  updateCity,
};
