const CrudRepository = require("./crud-respository");
const { Flight } = require("../models");

class FlightRepository extends CrudRepository {
  constructor() {
    super(Flight);
  }
}

module.exports = FlightRepository;
