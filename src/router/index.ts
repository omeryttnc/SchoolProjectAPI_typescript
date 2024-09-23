import express from "express";

import authontication from "./authontication";
import admins from "./admins";
import teachers from "./teachers";
import students from "./students";
const router = express.Router();

export default (): express.Router => {
  authontication(router);
  admins(router);
  teachers(router);
  students(router);
  return router;
};
