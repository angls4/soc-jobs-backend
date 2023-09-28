const jwt = require('jsonwebtoken');

const verifiedToken = (req, res, next) => {
  // Check if the request contains an Authorization header
  const token = req.header('Authorization');
  
  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access Denied - Missing or Invalid Token' });
  }

  // Extract the token value without 'Bearer ' prefix
  const tokenValue = token.slice(7);

  try {
    // Verify the token with your JWT secret
    const verified = jwt.verify(tokenValue, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'Access Denied - Invalid Token' });
  }
};

module.exports = verifiedToken;
