import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

import routes from "./routes/index.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import { logger } from "./utils/logger.js";
import { initDB } from "./models/db.js";
import { settings } from "./config/settings.js";

const app = express();
app.use(cors());
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/live-check", (req, res) => {
  logger.info("Info. Got live check request");
  res.sendStatus(200);
});

// show how to add v1 prefix
app.use("/v1", routes);

app.use(errorHandler);

const server = app.listen(settings.port, () => {
  console.log(`TODO app listening on port ${settings.port}!`);
  initDB(settings.mongoHost);
});

process.on('SIGTERM', () => {
  console.info('SIGTERM signal received.');
  console.log('Closing http server.');
  server.close(() => {
    console.log('Http server closed.');
    // boolean means [force], see in mongoose doc
    mongoose.connection.close(false, () => {
      console.log('MongoDb connection closed.');
    });
  });
});
