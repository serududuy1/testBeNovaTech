"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Penjualan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Penjualan.belongsTo(models.Products, {
        foreignKey: {
          name: "product_id",
        },
      });
    }
  }
  Penjualan.init(
    {
      tanggal_transaksi: DataTypes.DATE,
      product_id: DataTypes.INTEGER,
      quantity: DataTypes.STRING,
      total_harga: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Penjualan",
    }
  );
  return Penjualan;
};
