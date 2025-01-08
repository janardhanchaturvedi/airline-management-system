const express = require("express");
const { AirportMiddlewares } = require("../../middlewares");
const { AirportController } = require("../../controllers");

const router = express.Router();

router
  .post(
    "/",
    AirportMiddlewares.validateCreateRequest,
    AirportController.createAirport
  )
  .get("/", AirportController.getAirports)
  .get("/:id", AirportController.getAirportById)
  .delete("/:id", AirportController.destroyAirport)
  .patch("/:id", AirportController.updateAirport);

module.exports = router;
