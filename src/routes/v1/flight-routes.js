const express = require("express");
const { FlightMiddleware } = require("../../middlewares");
const { FlightController } = require("../../controllers");

const router = express.Router();

router.post(
  "/",
  FlightMiddleware.validateCreateRequest,
  FlightController.createFlight
);

router.get("/", FlightController.getFlights);

router.get("/:id", FlightController.getFligtDetails);

router.patch("/:id/seats", FlightMiddleware.validateUpdateSeat , FlightController.updateSeatsData);
module.exports = router;
