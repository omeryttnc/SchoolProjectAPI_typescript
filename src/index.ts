import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import { secretdata } from "../secretdata";
import mongoose from "mongoose";

import router from "./router";
import { config } from "../config";

const PORT = process.env.PORT || config.port;

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

mongoose.Promise = Promise;
mongoose.connect(secretdata.mongo);
mongoose.connection.on("error", (error: Error) => console.log(error));

app.use("/api", router());
