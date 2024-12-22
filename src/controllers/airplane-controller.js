const { StatusCodes } = require("http-status-codes");
const { AirplaneService } = require("../services");
const { error } = require("winston");

/**
 * POST : /airplanes
 * req-body : {modelNumber  : 'airbus320' , capicity : 200}
 */
async function createAirplane(req, res) {
  try {
    const airplane = await AirplaneService.createAirplane({
      modelNumber: req.body.modelNumber,
      capacity: req.body.capacity,
    });
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Sucessfully create an airplane",
      data: airplane,
      error: {},
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong",
      data: {},
      error: error,
    });
  }
}

module.exports = {
  createAirplane,
};
