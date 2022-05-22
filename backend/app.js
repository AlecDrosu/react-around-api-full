const express = require("express");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const routes = require("./routes");

const app = express();

mongoose.connect("mongodb://localhost:27017/aroundb");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: "624264c00febeb0fcf13c96c",
  };
  next();
});

const { PORT = 3000 } = process.env;

app.use(routes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
