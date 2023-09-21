const jwt = require('jsonwebtoken');

const verifiedToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access Denied' });
  }
  const tokenValue = token.slice(7); // Menghapus "Bearer " dari token

  // Tambahkan pernyataan console.log untuk memeriksa nilai token dan variabel lain
  console.log('Received Token:', tokenValue);

  try {
    const verified = jwt.verify(tokenValue, process.env.JWT_SECRET);
    req.user = verified;

    // Tambahkan pernyataan console.log untuk memeriksa nilai yang telah diverifikasi
    console.log('Verified User:', verified);

    next();
  } catch (err) {
    // Tambahkan pernyataan console.log untuk memeriksa kesalahan
    console.error(err);

    return res.status(401).json({ message: 'Invalid Token' });
  }
};

module.exports = verifiedToken;
