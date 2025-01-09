const express = require("express");
const { FlightMiddleware } = require("../../middlewares");
const { FlightController } = require("../../controllers");

const router = express.Router();

router.post(
  "/",
  FlightMiddleware.validateCreateRequest,
  FlightController.createFlight
);

module.exports = router;
