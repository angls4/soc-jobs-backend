const { handleError } = require("../utils/errorHandler"); // Import the error handling function

const crudController = {
  getAllBy: (model, where = {}, include = [], attributes, f) => {
    return async (req, res) => {
      try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        // Use Sequelize's findAndCountAll for pagination
        const { count, rows } = await model.findAndCountAll({
          where,
          limit,
          offset: (page - 1) * limit,
          include,
          attributes,
        });

        const totalPages = Math.ceil(count / limit);

        return res.status(200).json({
          code: 200,
          status: "OK",
          message: `Success getting paginated ${model.name}s`,
          data: {
            rows,
            totalRows: count,
            totalPages,
            currentPage: page,
          },
        });
      } catch (err) {
        return handleError(res, err);
      }
    };
  },
  getAll: (model, include = [], attributes, f) => {
    return async (req, res) => {
      return await crudController.getAllBy(
        model,
        {},
        include,
        attributes,
        f
      )(req, res);
    };
  },

  getById: (model,id=undefined, include = [], attributes, f) => {
    return async (req, res) => {
      id ??= req.params.id;
      try {
        const row = await model.findByPk(id, {
          include,
          attributes,
        });
        if (!row) {
          return res.status(404).json({
            code: 404,
            status: "Not Found",
            message: `${model.name} not found, finding ${id}`,
          });
        }
        return res.status(200).json({
          code: 200,
          status: "OK",
          message: `Success getting ${model.name} by ID`,
          data: row, // Return the row directly
        });
      } catch (err) {
        return handleError(res, err); // Handle errors using the handleError function
      }
    };
  },

  create: (model, f) => {
    return async (req, res) => {
      f ??= (req, res) => req.body;
      const data = await f(req, res);
      try {
        const row = await model.create(data);
        return res.status(201).json({
          code: 201,
          status: "Created",
          message: `Success creating ${model.name}`,
          data: row, // Return the created row directly
        });
      } catch (err) {
        return handleError(res, err); // Handle errors using the handleError function
      }
    };
  },

  update: (model, id = undefined, data=undefined, include) => {
    return async (req, res) => {
      id ??= req.params.id;
      data ??= req.body;

      try {
        const [updated] = await model.update(data, {
          where: { id },
        });
        if (!updated) {
          return res.status(404).json({
            code: 404,
            status: "Not Found",
            message: `${model.name} not found, finding ${id}`,
          });
        }
        const row = await model.findByPk(id,{
          include
        });
        return res.status(200).json({
          code: 200,
          status: "OK",
          message: `Success updating ${model.name}`,
          data: row, // Return the updated row directly
        });
      } catch (err) {
        return handleError(res, err); // Handle errors using the handleError function
      }
    };
  },

  delete: (model, id = undefined) => {
    return async (req, res) => {
      id ??= req.params.id;

      try {
        const deleted = await model.destroy({
          where: { id },
        });
        if (!deleted) {
          return res.status(404).json({
            code: 404,
            status: "Not Found",
            message: `${model.name} not found, finding ${id}`,
          });
        }
        return res.status(200).json({
          code: 200,
          status: "OK",
          message: `Success deleting ${model.name}`,
        });
      } catch (err) {
        return handleError(res, err); // Handle errors using the handleError function
      }
    };
  },
};

module.exports = { crudController };
