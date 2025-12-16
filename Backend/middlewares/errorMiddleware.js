import logger from "../config/logger.js";

export const errorHandler = (err, req, res, next) => {
  logger.error({
    message: err.message,
    method: req.method,
    url: req.originalUrl,
    stack: err.stack,
  });

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};
