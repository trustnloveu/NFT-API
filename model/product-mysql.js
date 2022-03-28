//* DB
const db = require("../util/db");

//* External Modules
const uuid = require("uuid");

// Model
// const Cart = require("./cart");

//* export > Product (save, fetchAll, findById, deleteOne)
module.exports = class Product {
  // constructor
  constructor(title, price, imageUrl, description) {
    this.id = uuid.v1(); // time-based unique id
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
  }

  // save
  save() {
    return db.execute(
      "INSERT INTO " +
        "products (id, title, price, imageUrl, description) " +
        "VALUES (?, ?, ?, ?, ?)",
      [this.id, this.title, this.price, this.imageUrl, this.description]
    );
  }

  // fetchAll
  static fetchAll() {
    return db.execute("SELECT * FROM products");
  }

  // findById
  static findById(id) {
    return db.execute(`SELECT * FROM products WHERE id = '${id}'`);
  }

  // deleteOne
  static deleteOne(id) {
    return db.deleteOne(`DELETE * FROM products WHERE id = '${id}'`);
  }
};
