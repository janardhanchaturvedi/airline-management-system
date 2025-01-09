const { StatusCodes } = require("http-status-codes");
const { error } = require("winston");
const { SuccessResponse, ErrorResponse } = require("../utils/common/index");
const { FlightService } = require("../services");

/**
 * POST : /airplanes
 * req-body : {name  : 'London' }
 */
async function createFlight(req, res) {
  console.log("🚀 ~ createFlight ~ req:", req , req.body.airplainId)
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
    console.log("🚀 ~ createFlight ~ error:", error)
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = { createFlight };
