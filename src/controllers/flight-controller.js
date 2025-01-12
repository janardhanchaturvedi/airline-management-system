const { StatusCodes } = require("http-status-codes");
const { error } = require("winston");
const { SuccessResponse, ErrorResponse } = require("../utils/common/index");
const { FlightService } = require("../services");

/**
 * POST : /airplanes
 * req-body : {
      "flightNumber": "CZI02445" ,
      "airplainId": 2,
      "departureAirportId": "VNS",
      "arrivalAirportId": "STV",
      "arrivalTime": "2025-01-12 16:34:08" ,
      "departureTime": "2025-01-12 20:44:08" ,
      "price": 11000,
      "boardingGate": "1A",
      "totalSeats": 250 
    }
 */
async function createFlight(req, res) {
  try {
    const city = await FlightService.createFlight({
      flightNumber: req.body.flightNumber,
      airplainId: req.body.airplainId,
      departureAirportId: req.body.departureAirportId,
      arrivalAirportId: req.body.arrivalAirportId,
      arrivalTime: req.body.arrivalTime,
      departureTime: req.body.departureTime,
      price: req.body.price,
      boardingGate: req.body.boardingGate,
      totalSeats: req.body.totalSeats,
    });
    SuccessResponse.data = city;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getFlights(req, res) {
  try {
    const flights = await FlightService.getAllFlights(req.query);
    if (!flights || !flights.length) {
      ErrorResponse.error = "Flights not found";
      ErrorResponse.message = "Flights doesn't match to given creteria";
      return res.status(StatusCodes.NOT_FOUND).json(ErrorResponse);
    }
    SuccessResponse.data = flights;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = { createFlight, getFlights };
