const jwt = require('jsonwebtoken');

// Secret key for generating JWTs
const JWT_SECRET = process.env.JWT_SECRET;

// Generate a JWT for the provided user object
function generateJWT(user) {
  const payload = {
    email: user.email,
    password: user.password,
  };
  const options = {
    expiresIn: '1d',
  };
  return jwt.sign(payload, JWT_SECRET, options);
}

// Middleware to verify a JWT token
// next is a function that will be called if the token is valid
function middlewareJWT(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send('Unauthorized');
  }
  // if jwt payload is valid, return and send the user object
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

module.exports = {
  middlewareJWT,
  generateJWT,
};
