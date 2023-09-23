const { User, Job } = require('../db/models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink);

// Define storage for uploaded avatars
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/avatar/'); // Define the destination folder for avatars
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${req.user.id}${ext}`); // Use the user's ID as the avatar filename
  },
});

// Define storage for uploaded CV files
const cvStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/cv/'); // Define the destination folder for CV files
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${req.user.id}_cv${ext}`); // Use the user's ID as part of the CV filename
  },
});

// Set up the multer upload middleware for avatars and CVs
const uploadAvatar = multer({ storage: storage }).single('avatar');
const uploadCV = multer({
  storage: cvStorage,
  fileFilter: (req, file, cb) => {
    const allowedFileTypes = /pdf/; // Only allow PDF files
    const ext = path.extname(file.originalname);
    const isAllowed = allowedFileTypes.test(ext.toLowerCase());
    if (isAllowed) {
      return cb(null, true);
    }
    cb(new Error('Invalid file type. Only PDF files are allowed.'));
  },
}).single('cv');

module.exports = {
  getProfile: async (req, res) => {
    try {
      const profile = await User.findOne({
        where: { id: req.user.id },
        attributes: { exclude: ['password'] },
        include: {
          model: Job,
          as: 'appliedJob',
          attributes: ['title', 'job_desc', 'logo', 'createdAt'],
          through: {
            attributes: ['status'],
          },
        },
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
      return res.status(500).json({
        code: 500,
        status: 'Internal Server Error',
        error: {
          message: err.message,
        },
      });
    }
  },

  getProfileById: async (req, res) => {
    const { id } = req.params;

    try {
      const profile = await User.findOne({
        where: { id },
        attributes: { exclude: ['password'] },
        include: {
          model: Job,
          as: 'appliedJob',
          attributes: ['title', 'job_desc', 'logo', 'createdAt'],
          through: {
            attributes: ['status'],
          },
        },
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
      return res.status(500).json({
        code: 500,
        status: 'Internal Server Error',
        error: {
          message: err.message,
        },
      });
    }
  },

  updateProfile: async (req, res) => {
    const { id } = req.user;
    const { name, email, password, gender, address, contact, cv } = req.body;
    const user_image = req.file;

    try {
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({
          code: 404,
          status: 'Not Found',
          message: 'User not found',
        });
      }

      // Update user data
      user.name = name;
      user.email = email;
      user.gender = gender;
      user.address = address;
      user.contact = contact;
      user.cv = cv;

      // Update user password if provided
      if (password) {
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(password, salt);
      }

      // Update user image if provided
      if (user_image) {
        user.avatar = user_image.path; // Store the avatar path in the 'avatar' field
      }

      await user.save();

      return res.status(200).json({
        code: 200,
        status: 'OK',
        message: 'Success update profile',
      });
    } catch (err) {
      return res.status(500).json({
        code: 500,
        status: 'Internal Server Error',
        error: {
          message: err.message,
        },
      });
    }
  },

  // Route to handle profile picture (avatar) upload
  uploadAvatar: upload.single('avatar'), // 'avatar' is the field name in the form

  // Route for handling profile picture uploads
  uploadProfilePicture: async (req, res) => {
    try {
      // Check if a file was uploaded
      if (!req.file) {
        return res.status(400).json({
          code: 400,
          status: 'Bad Request',
          message: 'No file uploaded.',
        });
      }

      // The file path where the avatar is saved (assuming you're storing it in 'src/avatar/')
      const avatarPath = req.file.path;

      // Perform any additional operations here, such as saving the file path to the user's profile
      // For example:
      // const userId = req.user.id;
      // const user = await User.findByPk(userId);
      // user.avatar = avatarPath;
      // await user.save();

      return res.status(200).json({
        code: 200,
        status: 'OK',
        message: 'Profile picture uploaded successfully.',
        avatarPath: avatarPath, // You can send the file path back in the response
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        code: 500,
        status: 'Internal Server Error',
        error: {
          message: err.message,
        },
      });
    }
  },
  // Route to handle CV file upload
  uploadCV: (req, res) => {
    uploadCV(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          code: 400,
          status: 'Bad Request',
          message: err.message,
        });
      }

      try {
        // Check if a file was uploaded
        if (!req.file) {
          return res.status(400).json({
            code: 400,
            status: 'Bad Request',
            message: 'No file uploaded.',
          });
        }

        // The file path where the CV is saved (assuming you're storing it in 'src/cv/')
        const cvPath = req.file.path;

        // Perform any additional operations here, such as saving the file path to the user's profile
        // For example:
        // const userId = req.user.id;
        // const user = await User.findByPk(userId);
        // user.cv = cvPath;
        // await user.save();

        return res.status(200).json({
          code: 200,
          status: 'OK',
          message: 'CV uploaded successfully.',
          cvPath: cvPath, // You can send the file path back in the response
        });
      } catch (err) {
        console.error(err);
        return res.status(500).json({
          code: 500,
          status: 'Internal Server Error',
          error: {
            message: err.message,
          },
        });
      }
    });
  },
};
  // // Route to handle profile picture (avatar) upload
  // uploadAvatar: upload.single('avatar'), // 'avatar' is the field name in the form

  // // Route for handling profile picture uploads
  // uploadProfilePicture: async (req, res) => {
  //   try {
  //     // Check if a file was uploaded
  //     if (!req.file) {
  //       return res.status(400).json({
  //         code: 400,
  //         status: 'Bad Request',
  //         message: 'No file uploaded.',
  //       });
  //     }

  //     // The file path where the avatar is saved (assuming you're storing it in 'src/avatar/')
  //     const avatarPath = req.file.path;

  //     // Perform any additional operations here, such as saving the file path to the user's profile
  //     // For example:
  //     // const userId = req.user.id;
  //     // const user = await User.findByPk(userId);
  //     // user.profile_image = avatarPath;
  //     // await user.save();

  //     return res.status(200).json({
  //       code: 200,
  //       status: 'OK',
  //       message: 'Profile picture uploaded successfully.',
  //       avatarPath: avatarPath, // You can send the file path back in the response
  //     });
  //   } catch (err) {
  //     console.error(err);
  //     return res.status(500).json({
  //       code: 500,
  //       status: 'Internal Server Error',
  //       error: {
  //         message: err.message,
  //       },
  //     });
  //   }
  // },

  //   forgotPassword: async (req, res) => {
//     const { email } = req.body;

//     try {
//       const user = await User.findOne({
//         where: { email },
//       });

//       if (!user) {
//         return res.status(404).json({
//           code: 404,
//           status: 'Not Found',
//           message: 'Email not found',
//         });
//       }

//       // Generate a reset token and send an email
//       const token = jwt.sign(
//         {
//           email: user.email,
//           id: user.id,
//         },
//         process.env.JWT_SECRET_KEY,
//         {
//           expiresIn: '5m',
//         }
//       );

//       // Send an email with the reset token (you can implement this function)
//       // await sendEmailForgotPassword(user.email, token);

//       return res.status(200).json({
//         code: 200,
//         status: 'OK',
//         message: 'Password reset token sent to your email',
//       });
//     } catch (err) {
//       return res.status(500).json({
//         code: 500,
//         status: 'Internal Server Error',
//         error: {
//           message: err.message,
//         },
//       });
//     }
//   },
//   resetPassword: async (req, res) => {
//     const { token, new_password } = req.body;

//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

//       if (!decoded) {
//         return res.status(401).json({
//           code: 401,
//           status: 'Unauthorized',
//           message: 'Token is invalid',
//         });
//       }

//       const user = await User.findByPk(decoded.id);

//       if (!user) {
//         return res.status(404).json({
//           code: 404,
//           status: 'Not Found',
//           message: 'User not found',
//         });
//       }

//       // Update user password
//       const salt = await bcrypt.genSalt();
//       user.password = await bcrypt.hash(new_password, salt);

//       await user.save();

//       return res.status(200).json({
//         code: 200,
//         status: 'OK',
//         message: 'Password reset successful',
//       });
//     } catch (err) {
//       return res.status(500).json({
//         code: 500,
//         status: 'Internal Server Error',
//         error: {
//           message: err.message,
//         },
//       });
//     }
//   },
// };