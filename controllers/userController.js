const { User, Job } = require('../db/models');
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');
const { handleError } = require('../utils/errorHandler'); // Import the error handling function
const { ValidationError } = require('sequelize');


module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      // Use Sequelize's findAndCountAll for pagination
      const { count, rows } = await User.findAndCountAll({
        attributes: { exclude: ['password'] },
        limit,
        offset: (page - 1) * limit,
      });

      const totalPages = Math.ceil(count / limit);

      return res.status(200).json({
        code: 200,
        status: "OK",
        message: "Success getting paginated users",
        data: {
          rows,
          totalUsers: count,
          totalPages,
          currentPage: page,
        },
      });
    } catch (err) {
      return handleError(res, err);
    }
  },

  getProfile: async (req, res) => {
    try {
      const profile = await User.findOne({
        where: { id: req.user.id },
        attributes: { exclude: ['password'] },
        // include: {
        //   model: Job,
        //   as: 'appliedJob',
        //   attributes: ['title', 'job_desc', 'logo', 'createdAt'],
        //   through: {
        //     attributes: ['status'],
        //   },
        // },
      });

      return res.status(200).json({
        code: 200,
        status: 'OK',
        message: 'Success get profile',
        data: {
          profile,
        },
      });
    } catch (err) {
      return handleError(res, err);
    }
  },

  getProfileById: async (req, res) => {
    const { id } = req.params;

    try {
      const profile = await User.findOne({
        where: { id },
        attributes: { exclude: ['password'] },
        // include: {
        //   model: Job,
        //   as: 'appliedJob',
        //   attributes: ['title', 'job_desc', 'logo', 'createdAt'],
        //   through: {
        //     attributes: ['status'],
        //   },
        // },
      });

      if (!profile) {
        return res.status(404).json({
          code: 404,
          status: 'Not Found',
          message: 'User not found',
        });
      }

      return res.status(200).json({
        code: 200,
        status: 'OK',
        message: 'Success get profile',
        data: {
          profile,
        },
      });
    } catch (err) {
      return handleError(res, err);
    }
  },

  updateProfile: async (req, res) => {
    // const id = req.params.id ?? req.user.id; // Use the ID from the route parameter or token's user Id
    const id = req.params.id; // Use the ID from the route parameter

    // Handle if non-admin user tries to update other user's profile
    if(req.user.role !== 'Admin')
    if(id != req.user.id){
      return res.status(403).json({
        code: 403,
        status: "Forbidden",
        message: "You do not have permission to edit other's profile.",
      });
    }
    
    const { name, email, password, gender, address, contact } = req.body;

    try {
      // const user = await User.findByPk(id);
      const user = {};
      
      // if (!user) {
      //   return res.status(404).json({
      //     code: 404,
      //     status: 'Not Found',
      //     message: 'User not found',
      //   });
      // }
      
      // Update user data (only exact values are saved)
      user.name = name;
      user.email = email;
      user.gender = gender;
      user.address = address;
      user.contact = contact;
      
      // Update user password if provided
      if (password) {
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(password, salt);
      }
      
      // Check if a CV file was uploaded
      // if (req.file) {
      //   user.cv = req.file.filename; // Store the CV filename in the 'cv' field
      // }
      

      const [updated] = await User.update(user, {
        where: { id },
      });

      if (!updated) {
        return res.status(400).json({
          code: 400,
          status: "Failed",
          message: "Failed update profile",
        });
      }
      
      return res.status(200).json({
        code: 200,
        status: "OK",
        message: "Success update profile",
        data: await User.findByPk(id), // Return the updated user directly
      });
      
      // await user.save();
      // return res.status(200).json({
      //   code: 200,
      //   status: 'OK',
      //   message: 'Success update profile',
      // });
    } catch (err) {
      return handleError(res, err);
    }
  },

  // Updated uploadAvatar function with Multer middleware
  uploadAvatar: async (req, res) => {
    try {
      // Check if a file was uploaded (Multer middleware adds 'file' to the request)
      if (!req.file) {
        return res.status(400).json({
          code: 400,
          status: 'Bad Request',
          message: 'No file uploaded.',
        });
      }

      const { id } = req.user;

      // Update the user's avatar path in the database
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({
          code: 404,
          status: 'Not Found',
          message: 'User not found',
        });
      }

      // Remove the previous avatar file if it exists
      if (user.avatar) {
        const avatarPath = path.join(__dirname, `../src/avatar/${user.avatar}`);
        fs.unlinkSync(avatarPath);
      }

      user.avatar = req.file.filename; // Store the new avatar filename in the 'avatar' field
      await user.save();

      return res.status(200).json({
        code: 200,
        status: 'OK',
        message: 'Profile picture uploaded successfully.',
        avatarPath: user.avatar,
      });
    } catch (err) {
      return handleError(res, err);
    }
  },

  // Updated uploadCV function with Multer middleware
  uploadCV: async (req, res) => {
    try {
      // Check if a file was uploaded (Multer middleware adds 'file' to the request)
      if (!req.file) {
        return res.status(400).json({
          code: 400,
          status: 'Bad Request',
          message: 'No file uploaded.',
        });
      }

      const { id } = req.user;

      // Update the user's CV path in the database
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({
          code: 404,
          status: 'Not Found',
          message: 'User not found',
        });
      }

      // Remove the previous CV file if it exists
      if (user.cv) {
        const cvPath = path.join(__dirname, `../src/cv/${user.cv}`);
        fs.unlinkSync(cvPath);
      }

      user.cv = req.file.filename; // Store the new CV filename in the 'cv' field
      await user.save();

      return res.status(200).json({
        code: 200,
        status: 'OK',
        message: 'CV uploaded successfully.',
        cvPath: user.cv,
      });
    } catch (err) {
      return handleError(res, err);
    }
  },
};