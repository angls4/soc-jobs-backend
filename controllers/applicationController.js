const { Application, Job, User, Position, Experience } = require("../db/models");
const { crudController } = require("../utils/crud");
const userController = require("./userController");
const jobController = require("./jobController");

const attributes = ["status", "updatedAt"];
const includeUser = {
  model: User,
  as: "User",
  attributes: ["name"],
  // attributes: userController.attributes,
};
const includeJob = {
  model: Job,
  as: "Job",
  attributes: ["title"],
  // include:jobController.include
  include: [
    {
      model: Position,
      as: "jobPosition",
      attributes: ["position_name"],
    },
    {
      model: Experience,
      as: "jobExperience",
      attributes: ["exp_desc"],
    },
  ],
};
const include = [includeUser, includeJob];

module.exports = {
  includeUser,
  includeJob,
  attributes,
  getAll: async (req, res) => {
    return await crudController.getAll(Application, {
      where: {},
      include,
      paginated: true,
    })(req, res);
  },
  getById: crudController.getById(Application, { include }),
  getByUserId: async (req, res) => {
    const { id } = req.params;
    return await crudController.getAll(Application, {
      where: { userId: id },
      include: includeJob,
      attributes,
    })(req, res);
  },
  getByJobId: async (req, res) => {
    const { id } = req.params;
    return await crudController.getAll(Application, {
      where: { jobId: id },
      include: includeUser,
      attributes,
    })(req, res);
  },
  create: crudController.create(Application),
  update: crudController.update(Application, { include }),
  delete: crudController.delete(Application),
};
