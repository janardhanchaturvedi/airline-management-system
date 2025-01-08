const { StatusCodes } = require("http-status-codes");
const { error } = require("winston");
const { SuccessResponse, ErrorResponse } = require("../utils/common/index");
const { AirportService } = require("../services");

/**
 * POST : /airplanes
 * req-body : {name  : 'Varnarsi' , code : VNS , address : Uttar Pradesh , cityId : 21}
 */
async function createAirport(req, res) {
  try {
    const airport = await AirportService.createAirport({
      name: req.body.name,
      code: req.body.code,
      address: req.body.address,
      cityId: req.body.cityId,
    });
    SuccessResponse.data = airport;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getAirports(req, res) {
  try {
    const airports = await AirportService.getAirports();
    SuccessResponse.data = airports;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getAirportById(req, res) {
  try {
    const airports = await AirportService.getAirportById(req.params.id);
    SuccessResponse.data = airports;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function destroyAirport(req, res) {
  try {
    const airport = await AirportService.destroyAirport(req.params.id);
    SuccessResponse.data = airport;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function updateAirport(req, res) {
  const { id } = req.params;
  const data = req.body;
  try {
    const updateAirport = await AirportService.updateAirport(id, data);
    SuccessResponse.data = updateAirport;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  createAirport,
  getAirports,
  getAirportById,
  destroyAirport,
  updateAirport,
};
