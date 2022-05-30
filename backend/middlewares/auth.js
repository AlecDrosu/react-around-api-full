const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

const UNAUTHORIZED = 401;

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(UNAUTHORIZED).send({ message: "No token provided" });
  }
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(UNAUTHORIZED).send({ message: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
};
