import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";

import router from "./router";
import { config } from "../config";

const PORT = process.env.PORT || config.port;
const DATABASE = process.env.DATABASE || ""; //secretdata.mongo

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
mongoose.connect(DATABASE);
mongoose.connection.on("error", (error: Error) => console.log(error));

app.use("/api", router());

//TODO CI/CD pipeline should be added
//TODO jest superTest some test should be added
//TODO cookies will give challange needs to find a way or change to barear token
//TODO lesson module should be added
//TODO admin should assign lesson to teacher
//TODO we need secretary for some admin roles
//TODO we need one super admin to approve admin. super admin should have additional password
//TODO class module should be created
//TODO secretary should assign lesson to teacher but it will be active when admin approve it
//TODO result module should be created
//TODO teacher should add/update/delete results
//TODO admin and students only can see resuls
//TODO report module should created
//TODO secretary should create report according to
//TODO a_ teacher
//TODO b_ student
//TODO c_ subject
//TODO d_ student
//TODO applying school module should created
//TODO supervisor module should created
