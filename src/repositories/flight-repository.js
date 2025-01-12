const CrudRepository = require("./crud-respository");
const { Flight , Airport ,Airplane, Sequelize } = require("../models");
class FlightRepository extends CrudRepository {
  constructor() {
    super(Flight);
  }
  async getAllFlights(filter) {
    const response = await Flight.findAll({
      where: filter,
      include: [
        {
          model: Airplane,
          required: true,
          as : "AirplaneDetails",
        },
        {
          model: Airport,
          required: true,
          on : {
            col1 : Sequelize.where(Sequelize.col("Flight.departureAirportId") , "=" , Sequelize.col("Airport.code"))
          },
        }
      ],
    });
    return response;
  }
}

module.exports = FlightRepository;
