const jwt = require("jsonwebtoken");
const { NODE_ENV, JWT_SECRET } = process.env;

const UNAUTHORIZED = 401;

const auth = (req, res, next) => {
  console.log('Auth middleware');
  const token = req.headers.authorization;
  if (!token) {
    return res.status(UNAUTHORIZED).send({ message: "No token provided" });
  }
  jwt.verify(token, NODE_ENV === 'production', JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(`Error: ${err}`);
      return res.status(UNAUTHORIZED).send({ message: "Invalid token" });
    }
    req.user = decoded;
    console.log(`server.js: req.user = ${req.user}`);
    next();
  });
};

module.exports = auth;