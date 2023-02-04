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
  // async getSalesByMonth(req, res) {
  //   await Penjualan.findAll({
  //     attributes: [
  //       [
  //         sequelize.fn("DATE_FORMAT", sequelize.col("tanggal_transaksi"), "%m"),
  //         "month",
  //       ],
  //       [sequelize.fn("SUM", sequelize.col("quantity")), "total_stock_keluar"],
  //       [sequelize.fn("SUM", sequelize.col("total_harga")), "total_uang_masuk"],
  //     ],
  //     group: [
  //       sequelize.fn("DATE_FORMAT", sequelize.col("tanggal_transaksi"), "%m"),
  //     ],
  //   })
  //     .then((result) => {
  //       res.status(200).json({
  //         status: "OK",
  //         message: "TERSEDIA",
  //         data: result,
  //       });
  //     })
  //     .catch((err) => {
  //       return err;
  //     });
  // },
  async getSalesByMonth(req, res) {
    await Penjualan.findAll({
      attributes: [
        [
          sequelize.fn("DATE_FORMAT", sequelize.col("tanggal_transaksi"), "%m"),
          "month",
        ],
        ["quantity", "quantity"],
        // [sequelize.fn("SUM", sequelize.col("quantity")), "total_stock_keluar"],
        // [sequelize.fn("SUM", sequelize.col("total_harga")), "total_uang_masuk"],
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
      order: ["tanggal_transaksi"],
      // group: ["month"],
    })
      .then((result) => {
        var sd = 0;
        var qts = 0;

        result.map((dt, i) => {
          var kal = parseInt(dt.Product.harga);
          sdt = parseInt(dt.quantity * kal);
          qts += parseInt(dt.quantity);

          parseInt((sd += sdt));
          return { sd, qts };
        });
        res.status(200).json({
          status: "OK",
          message: "TERSEDIA",
          data: {
            "total uang masuk": `${sd}`,
            "total Stok keluar": `${qts}`,
            rincian: result,
          },
        });
      })
      .catch((err) => {
        return err;
      });
  },
  async getAllSales(req, res) {
    await Penjualan.findAll({
      attributes: [
        ["id", "id"],
        ["product_id", "product_id"],
        ["tanggal_transaksi", "tanggal_transaksi"],
        ["quantity", "quantity"],
        ["createdAt", "createdAt"],
        ["updatedAt", "updatedAt"],
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
  async getAllKategoriById(req, res) {
    console.log(req.params.id);
    Kategories.findAll({
      include: [
        {
          where: [
            {
              kategori_id: req.params.id,
            },
          ],
          model: Products,
          include: [
            {
              model: Stocks,
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
};
