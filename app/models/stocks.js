'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stocks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Stocks.init({
    product_id: DataTypes.INTEGER,
    stock: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Stocks',
  });
  return Stocks;
};