import winston from "winston";

const { combine, timestamp, json, errors, colorize, printf } = winston.format;

const isDev = process.env.NODE_ENV !== "production";

/**
 * Custom console format (dev only)
 */
const consoleFormat = printf(({ level, message, timestamp, ...meta }) => {
  return `[${timestamp}] ${level}: ${message} ${
    Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ""
  }`;
});

const logger = winston.createLogger({
  level: isDev ? "debug" : "info",

  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }), // include stack trace
    json()
  ),

  transports: [
    // Console (DEV)
    ...(isDev
      ? [
          new winston.transports.Console({
            format: combine(colorize(), consoleFormat),
          }),
        ]
      : []),

    // Error logs
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),

    // Combined logs
    new winston.transports.File({
      filename: "logs/combined.log",
    }),
  ],

  // Handle crashes
  exceptionHandlers: [
    new winston.transports.File({ filename: "logs/exceptions.log" }),
  ],

  rejectionHandlers: [
    new winston.transports.File({ filename: "logs/rejections.log" }),
  ],
});

export default logger;
