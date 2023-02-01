const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 8999;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Selamat Datang",
  });
});
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
