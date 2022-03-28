//* MySQL2
// const mysql = require("mysql2");

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   database: "node-udemy",
//   password: "Didtk9310@",
// });

// module.exports = pool.promise();

//* Sequelize
const { Sequelize } = require("sequelize"); // Model, DataTyles

const sequelize = new Sequelize("node-udemy", "root", "Didtk9310@", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
