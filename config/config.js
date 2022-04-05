let path;

// property 파일 경로 지정
switch (process.env.NODE_ENV) {
  case "prod":
    path = `${__dirname}/prod.env`;
    break;
  case "dev":
    path = `${__dirname}/dev.env`;
    break;
  default:
    path = `${__dirname}/local.env`;
}

// config 파일 설정 ( = properties)
require("dotenv").config({ path });
