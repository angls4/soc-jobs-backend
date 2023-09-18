const jwt = require('jsonwebtoken');

const verifiedToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access Denied' });
  }
  const tokenValue = token.slice(7); // Menghapus "Bearer " dari token
  try {
    const verified = jwt.verify(tokenValue, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid Token' });
  }
};

module.exports = verifiedToken;
