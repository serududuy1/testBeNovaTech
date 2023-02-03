"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Products.hasOne(models.Stocks, {
        foreignKey: {
          name: "id",
        },
      });
      Products.belongsTo(models.Kategories, {
        foreignKey: {
          name: "kategori_id",
        },
      });
      Products.hasMany(models.Stocks, {
        foreignKey: {
          name: "id",
        },
      });
    }
  }
  Products.init(
    {
      kategori_id: DataTypes.INTEGER,
      tahun_keluaran: DataTypes.STRING,
      warna: DataTypes.STRING,
      harga: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Products",
    }
  );
  return Products;
};
