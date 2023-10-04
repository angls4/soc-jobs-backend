const { Job, Experience, Position, Type } = require("../db/models");
const { crudController } = require("../utils/crud");
const { handleError } = require('../utils/errorHandler'); // Import the error handling function
const { ValidationError } = require('sequelize');

const include = [
  {
    model: Type,
    as: "jobType",
    attributes: ["job_type"],
  },
  {
    model: Experience,
    as: "jobExperience",
    attributes: ["exp_desc"],
  },
  {
    model: Position,
    as: "jobPosition",
    attributes: ["position_name"],
  },
]

module.exports = {
  getAll: crudController.getAll(Job,include),
  getById: crudController.getById(Job,include),
  create: crudController.create(Job),
  update: crudController.update(Job),
  delete: crudController.delete(Job),
};