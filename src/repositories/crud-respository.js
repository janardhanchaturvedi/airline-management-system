const { StatusCodes } = require("http-status-codes");
const { Logger } = require("./../config");
const AppError = require("../utils/errors/app-errors");

class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
      const response = await this.model.create(data);
      return response;
  }

  async destroy(data) {
    try {
      const response = await this.model.destroy({
        where: {
          id: data,
        },
      });
      return response;
    } catch (error) {
      Logger.error("Something went wrong in  the CRUD repo : createdestroy");
    }
  }

  async get(data) {
    try {
      const response = await this.model.findByPk(data);
      if (!response) {
        throw new AppError(
          "Resource not found you requested for",
          StatusCodes.NOT_FOUND
        );
      }
      return response;
    } catch (error) {
      if (error.statusCode == StatusCodes.NOT_FOUND) {
        throw new AppError(
          "The Airplane you requested is not present",
          error.statusCode
        );
      }
      Logger.error("Something went wrong in  the CRUD repo : get");
    }
  }

  async getAll() {
    try {
      const response = await this.model.findAll();
      return response;
    } catch (error) {
      Logger.error("Something went wrong in  the CRUD repo : getAll");
    }
  }

  async update(id, data) {
    try {
      const response = await this.model.update(data, {
        where: {
          id: id,
        },
      });
      return response;
    } catch (error) {
      console.log("🚀 ~ CrudRepository ~ update ~ error:", error)
      Logger.error("Something went wrong in  the CRUD repo : update");
    }
  }
}

module.exports = CrudRepository;
