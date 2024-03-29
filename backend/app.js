const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const { errors } = require("celebrate");
require("dotenv").config();

const bodyParser = require("body-parser");

const routes = require("./routes");
const authRoute = require('./middlewares/auth');
const { login, createUser } = require("./controllers/users");
const errorHandler = require("./middlewares/error-handler");
const { validateLogin, validateProfile } = require("./middlewares/validators");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();
app.use(cors());
app.use(helmet());
app.options("*", cors());


// const { CONNECTION_URL, PORT = 3000 } = process.env;

const { PORT = 3000 } = process.env;

const url = process.env.CONNECTION_URL.toString();

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB :)");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB: ", err.message);
  });

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

app.use(authRoute);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.use(routes);

app.listen(PORT, () => {
  console.log("+++++++++++++++++++++++++++++++++++++++++++++++++");
  console.log(`Listening on port ${PORT}`);
  console.log(`URL: ${url}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`url is a: ${typeof url}`);
  console.log("----------------------------------------------------");
});
