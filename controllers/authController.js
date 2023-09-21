const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../db/models'); // Import User model

// Function to generate JWT token
const generateAuthToken = (user) => {
  const { id, name, email } = user;
  return jwt.sign({ id, name, email }, process.env.JWT_SECRET, {
    expiresIn: '1d'
  });
};

// Login logic
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Wrong password' });
    }

    const token = generateAuthToken(user);
    return res.json({ message: 'Login success', token, name: user.name });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Register logic
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    const token = generateAuthToken(user);
    return res.json({ message: 'Register success', token, name: user.name });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Logout logic
exports.logout = (req, res) => {
  // For token-based authentication, there's no need for explicit server-side logout
  res.json({ message: 'Logout success' });
};
