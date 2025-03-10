const jwt = require('jsonwebtoken');
const secretKey =  process.env.JWT_SECRET;


const generateToken = (user) => {
  return jwt.sign(user, secretKey, { expiresIn: '1h' });
};
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(403).send('A token is required for authentication');
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }
  return next();
};

module.exports = {
  generateToken,
  verifyToken
};
