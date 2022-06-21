const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
require('dotenv').config();

const bodyParser = require("body-parser");

const routes = require("./routes");
const { login, createUser } = require("./controllers/users");
const errorHandler = require("./middlewares/error-handler");
const { validateLogin, validateProfile } = require("./middlewares/validators");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();
app.use(cors());
app.use(helmet());
app.options('*', cors());

mongoose.connect("mongodb://localhost:27017/aroundb");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

app.post('/signin', validateLogin, login)
app.post("/signup", validateProfile, createUser);

app.use(errorLogger);

app.use(errorHandler);

const { PORT = 3000 } = process.env;

app.use(routes);


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});