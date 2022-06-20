const user = require("../models/user");

const { NODE_ENV, JWT_SECRET = "secret" } = process.env;

module.exports = {
    JWT_SECRET,
    NODE_ENV,
};