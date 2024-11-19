import express from "express";

import {
  deleteTeacher,
  getAllTeachers,
  getTeacher,
  updateTeacher,
} from "../controllers/teachers";
import { checkPermissionForAdmin, isTeacherExist } from "../middlewares";
import { approveUser } from "../controllers/admins";

export default (router: express.Router) => {
  router.get("/teachers", [checkPermissionForAdmin()], getAllTeachers);
  router.get(
    "/teachers/:id",
    // [isTeacherExist, checkPermissionForAdmin()],
    getTeacher
  );
  router.delete(
    "/teachers/:id",
    [isTeacherExist, checkPermissionForAdmin()],
    deleteTeacher
  );
  router.patch(
    "/teachers/:id",
    [isTeacherExist, checkPermissionForAdmin()],
    updateTeacher
  );

  router.patch(
    "/teachers/approve/:id",
    [isTeacherExist, checkPermissionForAdmin()],
    approveUser
  );
};
