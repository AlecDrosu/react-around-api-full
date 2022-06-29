const jwt = require("jsonwebtoken");
const { NODE_ENV, JWT_SECRET } = process.env;

const UNAUTHORIZED = 401;

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(UNAUTHORIZED).send({ message: "No token provided" });
  }
  jwt.verify(token, NODE_ENV === 'production', JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(UNAUTHORIZED).send({ message: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
};

module.exports = auth;