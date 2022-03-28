const { DataTypes } = require("sequelize");

//* DB - Sequelize
const sequelize = require("../util/db");

//* Model
const Product = sequelize.define("products", {
  id: {
    primaryKey: true,
    unique: true,
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

//* Export
module.exports = Product;
