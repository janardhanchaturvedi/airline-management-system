"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Airplane, {
        foreignKey: "airplainId",
        as  : "AirplaneDetails"
      });
      this.belongsTo(models.Airport, {
        foreignKey: "departureAirportId",
        onDelete: "CASCADE",
        as : "departureAirportDetails"
      });
      this.belongsTo(models.Airport, {
        foreignKey: "arrivalAirportId",
        onDelete: "CASCADE",
        as : "arrivalAirportDetails"
      });
    }
  }
  Flight.init(
    {
      flightNumber: { type: DataTypes.STRING, allowNull: false },
      airplainId: { type: DataTypes.INTEGER, allowNull: false },
      departureAirportId: { type: DataTypes.STRING, allowNull: false },
      arrivalAirportId: { type: DataTypes.STRING, allowNull: false },
      arrivalTime: { type: DataTypes.DATE, allowNull: false },
      departureTime: { type: DataTypes.DATE, allowNull: false },
      price: { type: DataTypes.INTEGER, allowNull: false },
      boardingGate: { type: DataTypes.STRING },
      totalSeats: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "Flight",
    }
  );
  return Flight;
};
