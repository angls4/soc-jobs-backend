const { Application } = require('../db/models');
const { crudController } = require("../utils/crud");


module.exports = {
  getAll: crudController.getAll(Application),
  getById: crudController.getById(Application),
  getByUserId: async (req, res) => {},
  getByJobId: async (req, res) => {},
  create: crudController.create(Application),
  update: crudController.update(Application),
  delete: crudController.delete(Application),
};