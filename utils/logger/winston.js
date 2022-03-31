const winston = require("winston"); // = { createLogger, format, transports } // format = { combine, timestamp, label, prinft }
const winstonDaily = require("winston-daily-rotate-file");

const logDir = "logs"; // 'logs' 디렉토리 하위
const errorDir = "logs/error";
const { combine, timestamp, printf } = winston.format;

// 로그 포멧 (info => { level, message, label, timestamp } )
const logFormat = printf((info) => {
  return `${info.timestamp} [${info.label}] ${info.level} : ${info.message}`;
});

/**
 * 로그 레벨
 *      error   : 0
 *      warn    : 1
 *      info    : 2
 *      http    : 3
 *      verbose : 4
 *      debug   : 5
 *      silly   : 6
 */
const logger = winston.createLogger({
  defaultMeta: { service: "NFT-Service" },
  format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), logFormat),
  // format: winston.format.json(),
  transports: [
    // info
    new winstonDaily({
      level: "info",
      datePattern: "YYYY-MM-DD",
      dirname: logDir,
      filename: `%DATE%.log`,
      zippedArchive: true, // 파일 압축
      // maxFiles: 30, // 최대 30일 로그 파일 저장
    }),
    // .on("rotate", (oldFileName, newFileName) => {}), // new, rotate, archive, logRemoved
    // error
    new winstonDaily({
      level: "error",
      datePattern: "YYYY-MM-DD",
      dirname: errorDir, // logs -> error 디렉토리
      fileName: `%DATE%.error.log`,
      zippedArchive: true, // 파일 압축
      // maxFiles: 30, // 최대 30일 로그 파일 저장
    }),
  ],
});

// 실행 환경 != PROD -> 콘솔 로그 활성화
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(), // 색상 적용
        winston.format.simple() // `${info.level}: ${info.message} JSON.stringify({ ...rest })` 포맷으로 출력
      ),
    })
  );
}

module.exports = { logger };
