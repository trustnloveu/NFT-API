const Web3 = require("web3");
const UNFT = require("./truffle_abis/UNFT");
const ContractAddress = require("./config/nft-address");
// const path = require("path");

const express = require("express");
const app = express();

//* Settings
// app.set("view engine", "ejs");
// app.set("views", "views");

//* Swagger
const { swaggerUi, specs } = require("./utils/swagger");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

//* DB -> Sequlize
// const sequelize = require("./util/db");

//* Models
// const Product = require("./models/product-sequelize");

//* Controller
const errorController = require("./controllers/error");

//* Routes
const nodeRoutes = require("./routes/node");

//* Utils
app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, "public")));

//* Middleware Functions
app.use((req, res, next) => {
  const web3 = new Web3(
    Web3.givenProvider || Web3.currentProvider || "http://211.54.150.66:18545"
  );

  if (!web3) res.send("Failed to access Blockchain.");

  const nftContract = new web3.eth.Contract(UNFT.abi, ContractAddress);

  req.web3 = web3;
  req.nftContract = nftContract;

  next();
});

//* Navigations
app.use("/node", nodeRoutes);

//* 404 : Page not found
app.use(errorController.get404);

//* Associations
// User.hasOne(Cart);
// User.hasMany(Order);
// User.hasMany(Product);
// Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
// Product.belongsToMany(Cart, { through: CartItem });
// Cart.belongsTo(User);
// Cart.belongsToMany(Product, { through: CartItem });
// Order.belongsTo(User);
// Order.belongsToMany(Product, { through: OrderItem });

//* DB Connection
// sequelize
//   .sync() // { force: true }
//   .then(() => {
//     return User.findByPk(1);
//   })
//   .then((user) => {
//     if (!user) {
//       return User.create({ name: "Austin", email: "test@test.com" });
//     }
//     return Promise.resolve(user); // just `user` is fine
//   })
//   .then((user) => {
//     return Cart.findOne({ where: { userId: user.id } }).then((cart) => {
//       if (!cart) {
//         return user.createCart();
//       }
//       return cart;
//     });
//   })
//   .then((cart) => {
//     app.listen(3000);
//   })

//   .catch((error) => {
//     console.log(error);
//   });

//* Port
console.log(`현재 실행 환경 ::: ${process.env.NODE_ENV}`);
app.listen(process.env.PORT || 3000);
