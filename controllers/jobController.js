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
  getAll: async (req, res) => {
    return await crudController.getAll(Job, {
      where: {},
      include,
      paginated: true,
    })(req, res);
  },
  getById: crudController.getById(Job,{ include }),
  create: crudController.create(Job),
  update: crudController.update(Job, { include }),
  delete: crudController.delete(Job),
};