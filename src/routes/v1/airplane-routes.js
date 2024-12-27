const express = require("express");
const { AirplaneController } = require("../../controllers");

const router = express.Router();

router
  .post("/", AirplaneController.createAirplane)
  .get("/", AirplaneController.getAirplanes)
  .get("/:id", AirplaneController.getAirplaneById)
  .delete("/:id", AirplaneController.destroyAirplane)
  .patch("/:id", AirplaneController.updateAirplane);

module.exports = router;
