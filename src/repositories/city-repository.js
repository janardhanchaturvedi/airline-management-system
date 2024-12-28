const CrudRepository = require("./crud-respository");
const { City } = require("../models");

class CityRepository extends CrudRepository {
  constructor() {
    super(City);
  }
}

module.exports = CityRepository;
