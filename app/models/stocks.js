"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Stocks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Stocks.belongsTo(models.Products, {
        foreignKey: {
          name: "product_id",
        },
      });
      Stocks.hasOne(models.Products, {
        foreignKey: {
          name: "id",
        },
      });
      Stocks.hasMany(models.Penjualan, {
        foreignKey: {
          name: "id",
        },
      });
    }
  }
  Stocks.init(
    {
      product_id: DataTypes.INTEGER,
      stock: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Stocks",
    }
  );
  return Stocks;
};
