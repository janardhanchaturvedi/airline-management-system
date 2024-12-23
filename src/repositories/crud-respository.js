const { StatusCodes } = require("http-status-codes");
const { Logger } = require("./../config");
const AppError = require("../utils/errors/app-errors");

class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      const response = await this.model.create(data);
      return response;
    } catch (error) {
      Logger.error("Something went wrong in  the CRUD repo : create");
    }
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
      console.log("🚀 ~ CrudRepository ~ get ~ response:", response);
      if (!response) {
        throw new AppError(
          "Resource not found you requested for",
          StatusCodes.NOT_FOUND
        );
      }
      return response;
    } catch (error) {
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
      const response = await this.model.Update(data, {
        where: {
          id: id,
        },
      });
      return response;
    } catch (error) {
      Logger.error("Something went wrong in  the CRUD repo : update");
    }
  }
}

module.exports = CrudRepository;
