const { Job, Experience, Position, Type } = require("../db/models");
const { crudController } = require("../utils/crud");

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
  include,
  getAll: crudController.getAll(Job,include),
  getById: crudController.getById(Job,undefined,include),
  create: crudController.create(Job),
  update: crudController.update(Job,undefined,undefined,include),
  delete: crudController.delete(Job),
};