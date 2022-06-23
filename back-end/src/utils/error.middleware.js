import { logger } from "./logger.js";

export function errorHandler(err, req, res, next) {
  if (err) {
    logger.error("App error:", {
      message: err.message,
      stack: err.stack,
    });
    if (!err.status) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }

    return res.status(err.status).json({
      message: err.message,
    });
  }
  next();
}
