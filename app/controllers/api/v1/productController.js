const { Penjualan, Products, Kategories, Stocks } = require("../../../models");

const sequelize = require("sequelize");

// // // Connect to database

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
    Stocks.findAll({
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
    }).then((result) => {
      res.status(200).json({
        status: "OK",
        message: "TERSEDIA",
        data: result,
      });
    });
  },
  getStockProduct(req, res) {
    Penjualan.findAll({
      attributes: [
        ["id", "id_penjualan"],
        ["stock_id", "id_stock"],
        ["quantity", "quantity"],
      ],
      include: [
        {
          model: Stocks,
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
        },
      ],
      group: ["stock_id"],
      raw: true,
    }).then((result) => {
      res.status(200).json({
        status: "OK",
        message: "TERSEDIA",
        data: result,
      });
    });
  },
  getSalesByMonth(req, res) {
    Penjualan.findAll({
      attributes: [
        // [
        //   sequelize.fn("DATE_FORMAT", sequelize.col("tanggal_transaksi"), "%m"),
        //   "month",
        // ],
        [
          sequelize.fn("DATE_FORMAT", sequelize.col("tanggal_transaksi"), "%m"),
          "month",
        ],
        [sequelize.fn("SUM", sequelize.col("quantity")), "total_penjualan"],
        ["quantity", "quantity"],
        // [sequelize.fn("sum", sequelize.col("quantity")), "total_sales"],
      ],
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

      group: [
        sequelize.fn("DATE_FORMAT", sequelize.col("tanggal_transaksi"), "%m"),
      ],
      // raw: true,
    }).then((result) => {
      res.status(200).json({
        status: "OK",
        message: "TERSEDIA",
        data: result,
      });
    });
  },
};
