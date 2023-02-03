const { Penjualan, Products, Kategories, Stocks } = require("../../../models");
const sequelize = require("sequelize");

module.exports = {
  async getAllProduct(req, res) {
    await Products.findAll()
      .then((result) => {
        res.status(200).json({
          status: "OK",
          message: "TERSEDIA",
          data: result,
        });
      })
      .catch((err) => {
        return err;
      });
  },
  async getAllKategori(req, res) {
    await Kategories.findAll()
      .then((result) => {
        res.status(200).json({
          status: "OK",
          message: "TERSEDIA",
          data: result,
        });
      })
      .catch((err) => {
        return err;
      });
  },
  async getAllStock(req, res) {
    await Stocks.findAll({
      include: [
        {
          model: Products,
          required: true,
          include: [
            {
              model: Kategories,
              distinct: true,
              required: true,
            },
          ],
        },
      ],
    })
      .then((result) => {
        res.status(200).json({
          status: "OK",
          message: "TERSEDIA",
          data: result,
        });
      })
      .catch((err) => {
        return err;
      });
  },
  async getStockProduct(req, res) {
    await Stocks.findAll({
      attributes: [["stock", "stock"]],
      include: [
        {
          model: Products,
          attributes: [["harga", "harga"]],
          include: [
            {
              model: Kategories,
              attributes: [
                ["deskripsi", "deskripsi"],
                ["nama", "nama"],
              ],
            },
          ],
        },
      ],
      group: ["stocks.id"],
    })
      .then((result) => {
        res.status(200).json({
          status: "OK",
          message: "TERSEDIA",
          data: result,
        });
      })
      .catch((err) => {
        return err;
      });
  },
  async getSalesByMonth(req, res) {
    await Penjualan.findAll({
      attributes: [
        [
          sequelize.fn("DATE_FORMAT", sequelize.col("tanggal_transaksi"), "%m"),
          "month",
        ],
        [sequelize.fn("SUM", sequelize.col("quantity")), "total_stock_keluar"],
        [sequelize.fn("SUM", sequelize.col("total_harga")), "total_uang_masuk"],
      ],
      group: [
        sequelize.fn("DATE_FORMAT", sequelize.col("tanggal_transaksi"), "%m"),
      ],
    })
      .then((result) => {
        res.status(200).json({
          status: "OK",
          message: "TERSEDIA",
          data: result,
        });
      })
      .catch((err) => {
        return err;
      });
  },
  async getAllSales(req, res) {
    await Penjualan.findAll({
      include: [
        {
          model: Products,
          include: [
            {
              model: Kategories,
            },
          ],
        },
      ],
      group: ["Penjualan.id"],
    })
      .then((result) => {
        res.status(200).json({
          message: "berhasil",
          data: result,
        });
      })
      .catch((err) => {
        return err;
      });
  },
};
