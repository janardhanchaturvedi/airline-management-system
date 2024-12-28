const express = require("express");
const router = express.Router();
const { InfoController } = require("./../../controllers");
const airPlaneRoutes = require("./airplane-routes");
const cityRoutes = require("./city-routes");

router.get("/info", InfoController.getInfo);

router.use("/airplanes", airPlaneRoutes);
router.use("/city", cityRoutes);

module.exports = router;
