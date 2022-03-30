const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "NFT API",
      version: "1.0.0",
      description: "NFT Token API on NodeJS",
    },
    host: "localhost:3000",
    basePath: "/",
  },
  apis: ["./routes/*.js", "./utils/swagger/*"],
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
