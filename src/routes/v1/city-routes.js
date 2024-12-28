const express = require("express");
const { CityController } = require("../../controllers");
const { CityMiddlewares } = require("../../middlewares");

const router = express.Router();

router
  .post("/", CityMiddlewares.validateCreateRequest, CityController.createCity)
  .get("/", CityController.getCities)
  .get("/:id", CityController.getCityById)
  .delete("/:id", CityController.destroyCity)
  .patch("/:id", CityController.updateCity);

module.exports = router;
