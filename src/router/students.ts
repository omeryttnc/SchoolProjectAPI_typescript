import express from "express";

import {
  changeRoleStudent,
  deleteStudent,
  getAllStudents,
  getStudent,
  updateStudent,
} from "../controllers/students";
import { checkPermissionForAdmin, isStudentExist } from "../middlewares";
import { approveUser } from "../controllers/admins";

export default (router: express.Router) => {
  router.get("/students", [checkPermissionForAdmin()], getAllStudents);
  router.get(
    "/students/:id",
    [isStudentExist, checkPermissionForAdmin()],
    getStudent
  );

  router.delete(
    "/students/:id",
    [isStudentExist, checkPermissionForAdmin()],
    deleteStudent
  );

  router.patch(
    "/students/:id",
    [isStudentExist, checkPermissionForAdmin()],
    updateStudent
  );
  router.patch(
    "/students/approve/:id",
    [isStudentExist, checkPermissionForAdmin()],
    approveUser
  );
  router.patch(
    "/student/change-role/:id",
    [isStudentExist, checkPermissionForAdmin()],
    changeRoleStudent
  );
};
