const { handleError } = require("../utils/errorHandler"); // Import the error handling function

const crudController = {
  getAll: (model, include = []) => {
    return async (req, res) => {
      try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        // Use Sequelize's findAndCountAll for pagination
        const { count, rows } = await model.findAndCountAll({
          limit,
          offset: (page - 1) * limit,
          include,
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

  getById: (model, include = []) => {
    return async (req, res) => {
      const { id } = req.params;
      try {
        const row = await model.findByPk(id, {
          include,
        });
        if (!row) {
          return res.status(404).json({
            code: 404,
            status: "Not Found",
            message: `${model.name} not found`,
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

  create: (model) => {
    return async (req, res) => {
      try {
        const row = await model.create(req.body);
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

  update: (model) => {
    return async (req, res) => {
      const { id } = req.params;

      try {
        const [updated] = await model.update(req.body, {
          where: { id },
        });
        if (!updated) {
          return res.status(404).json({
            code: 404,
            status: "Not Found",
            message: `${model.name} not found`,
          });
        }
        const row = await model.findByPk(id);
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

  delete: (model) => {
    return async (req, res) => {
      const { id } = req.params;

      try {
        const deleted = await model.destroy({
          where: { id },
        });
        if (!deleted) {
          return res.status(404).json({
            code: 404,
            status: "Not Found",
            message: `${model.name} not found`,
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
