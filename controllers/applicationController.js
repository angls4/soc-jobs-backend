const { Application, Job, User } = require('../db/models');
const { crudController } = require("../utils/crud");
const userController = require("./userController");
const jobController = require("./jobController");

const include = [
  {
    model: User,
    as: "User",
    attributes: {exclude: ["password"] },
  },
  {
    model: Job,
    as: "Job",
    include:jobController.include
  },
];

module.exports = {
  getAll: crudController.getAll(Application,include),
  getById: crudController.getById(Application,undefined,include),
  getByUserId: async (req, res) => {
    const {id} = req.params;
    return await crudController.getAllBy(Application,{userId:id},include)(req,res);
  },
  getByJobId: async (req, res) => {
    const {id} = req.params;
    return await crudController.getAllBy(Application,{jobId:id},include)(req,res);
  },
  create: crudController.create(Application),
  update: crudController.update(Application,undefined,undefined,include),
  delete: crudController.delete(Application),
};