const { Products, Kategories, Stocks } = require("../../../models");

module.exports = {
  getAllProduct(req, res) {
    Products.findAll().then((result) => {
      res.status(200).json({
        status: "OK",
        message: "TERSEDIA",
        data: result,
      });
    });
  },
  getAllKategori(req, res) {
    Kategories.findAll().then((result) => {
      res.status(200).json({
        status: "OK",
        message: "TERSEDIA",
        data: result,
      });
    });
  },
  getAllStock(req, res) {
    Stocks.findAll().then((result) => {
      res.status(200).json({
        status: "OK",
        message: "TERSEDIA",
        data: result,
      });
    });
  },
};
