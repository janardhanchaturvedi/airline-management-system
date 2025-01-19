const CrudRepository = require("./crud-respository");
const { Flight , Airport ,Airplane, Sequelize , City  } = require("../models");
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
          as : 'departureAirportDetails',
          on : {
            col1 : Sequelize.where(Sequelize.col("Flight.departureAirportId") , "=" , Sequelize.col("departureAirportDetails.code"))
          },
          include : {
            model :City,
            required : true
          }
        },
        {
          model: Airport,
          required: true,
          as : 'arrivalAirportDetails',
          on : {
            col1 : Sequelize.where(Sequelize.col("Flight.arrivalAirportId") , "=" , Sequelize.col("arrivalAirportDetails.code"))
          },
          include : {
            model :City,
            required : true
          }
        }
      ],
    });
    return response;
  }
}

module.exports = FlightRepository;
