const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const { errors } = require("celebrate");
require("dotenv").config();

const bodyParser = require("body-parser");

const routes = require("./routes");
const { login, createUser } = require("./controllers/users");
const errorHandler = require("./middlewares/error-handler");
const { validateLogin, validateProfile } = require("./middlewares/validators");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();
app.use(cors());
app.use(helmet());
app.options("*", cors());

const { CONNECTION_URL, PORT = 3000 } = process.env;

// mongoose.connect("mongodb://localhost:27017/aroundb");
mongoose.connect(CONNECTION_URL);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.post("/signin", validateLogin, login);
app.post("/signup", validateProfile, createUser);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.use(routes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
