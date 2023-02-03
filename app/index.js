const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("../config/routes");
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Selamat Datang",
  });
});
app.use(routes);
app.use("*", (req, res) => {
  res.status(404).json({
    message: "URL TIDAK TERSEDIA",
  });
});

app.use((error, req, res, next) => {
  const status = error.errorStatus || 500;
  const message = error.message;
  const data = error.data;

  res.status(status).json({ message, data });
});
module.exports = app;
