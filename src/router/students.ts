import express from "express";

import {
  deleteStudent,
  getAllStudents,
  updateStudent,
} from "../controllers/students";
import { checkPermissionForAdmin } from "../middlewares";
import { getStudentById } from "../db/students";
import { approveUser } from "../controllers/admins";

export default (router: express.Router) => {
  router.get("/students",checkPermissionForAdmin(), getAllStudents);
  router.get("/students/:id", [checkPermissionForAdmin()], getStudentById);
  router.delete(
    "/students/:id",
    [ checkPermissionForAdmin()],
    deleteStudent
  );
  router.patch("/students/:id", [checkPermissionForAdmin()], updateStudent);

  router.patch("/students/approve/:id",[checkPermissionForAdmin()],approveUser)
};
