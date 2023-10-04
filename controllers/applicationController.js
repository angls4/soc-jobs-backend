const { Application, Job, User } = require('../db/models');
const { crudController } = require("../utils/crud");
const userController = require("./userController");
const jobController = require("./jobController");

const includeUser = {
  model: User,
  as: "User",
  attributes: userController.attributes,
};
const includeJob = {
  model: Job,
  as: "Job",
  include:jobController.include
};
const include = [
  includeUser,
  includeJob
];

module.exports = {
  getAll: async (req, res) => {
    return await crudController.getAll(Application, {
      where: {},
      include,
      paginated:true
    })(req, res);
  },
  getById: crudController.getById(Application, { include }),
  getByUserId: async (req, res) => {
    const { id } = req.params;
    return await crudController.getAll(Application, {
      where: { userId: id },
      include: includeJob,
    })(req, res);
  },
  getByJobId: async (req, res) => {
    const { id } = req.params;
    return await crudController.getAll(Application, {
      where: { jobId: id },
      include: includeUser,
    })(req, res);
  },
  create: crudController.create(Application),
  update: crudController.update(Application,{ include }),
  delete: crudController.delete(Application),
};