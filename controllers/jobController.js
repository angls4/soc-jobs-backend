const { Job, User, Application } = require('../db/models');
const { handleError } = require('../utils/errorHandler'); // Import the error handling function
const Pagination = require('../pagination/jobPagination');


module.exports = {
  getAllJobs: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
  
      const jobsQuery = Job.findAll(); // Get all jobs
  
      const pagination = new Pagination(jobsQuery, page, limit);
      const results = await pagination.getResults();
  
      return res.status(200).json({
        code: 200,
        status: 'OK',
        message: 'Success getting paginated jobs',
        data: results,
      });
    } catch (err) {
      return handleError(res, err);
    }
  },
  

  getJobById: async (req, res) => {
    const { id } = req.params;
    try {
      const job = await Job.findByPk(id);
      if (!job) {
        return res.status(404).json({
          code: 404,
          status: 'Not Found',
          message: 'Job not found',
        });
      }
      return res.status(200).json({
        code: 200,
        status: 'OK',
        message: 'Success getting job by ID',
        data: job, // Return the job directly
      });
    } catch (err) {
      return handleError(res, err); // Handle errors using the handleError function
    }
  },

  createJob: async (req, res) => {
    try {
      const { role } = req.user; // Get the user's role from the token
      if (role !== 'Admin') {
        return res.status(403).json({
          code: 403,
          status: 'Forbidden',
          message: 'You do not have permission to create a job.',
        });
      }
      
      const job = await Job.create(req.body);
      return res.status(201).json({
        code: 201,
        status: 'Created',
        message: 'Success creating job',
        data: job, // Return the created job directly
      });
    } catch (err) {
      return handleError(res, err); // Handle errors using the handleError function
    }
  },

  updateJob: async (req, res) => {
    const { id } = req.params;
    try {
      const { role } = req.user; // Get the user's role from the token
      if (role !== 'Admin') {
        return res.status(403).json({
          code: 403,
          status: 'Forbidden',
          message: 'You do not have permission to update a job.',
        });
      }
      
      const [updated] = await Job.update(req.body, {
        where: { id },
      });
      if (!updated) {
        return res.status(404).json({
          code: 404,
          status: 'Not Found',
          message: 'Job not found',
        });
      }
      const job = await Job.findByPk(id);
      return res.status(200).json({
        code: 200,
        status: 'OK',
        message: 'Success updating job',
        data: job, // Return the updated job directly
      });
    } catch (err) {
      return handleError(res, err); // Handle errors using the handleError function
    }
  },

  deleteJob: async (req, res) => {
    const { id } = req.params;
    try {
      const { role } = req.user; // Get the user's role from the token
      if (role !== 'Admin') {
        return res.status(403).json({
          code: 403,
          status: 'Forbidden',
          message: 'You do not have permission to delete a job.',
        });
      }
      
      const deleted = await Job.destroy({
        where: { id },
      });
      if (!deleted) {
        return res.status(404).json({
          code: 404,
          status: 'Not Found',
          message: 'Job not found',
        });
      }
      return res.status(200).json({
        code: 200,
        status: 'OK',
        message: 'Success deleting job',
      });
    } catch (err) {
      return handleError(res, err); // Handle errors using the handleError function
    }
  },
};
