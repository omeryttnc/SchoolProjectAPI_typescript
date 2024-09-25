import express from "express";

import { deleteTeacher, getAllTeachers, updateTeacher } from "../controllers/teachers";
import { checkPermissionForAdmin, isTeacherExist } from "../middlewares";
import { getTeacherById } from "../db/teachers";
import { approveUser } from "../controllers/admins";

export default (router: express.Router) => {
  router.get("/teachers", [checkPermissionForAdmin()], getAllTeachers);
  router.get(
    "/teachers/:id",
    [isTeacherExist, checkPermissionForAdmin()],
    getTeacherById
  );
  router.delete(
    "/teachers/:id",
    [isTeacherExist, checkPermissionForAdmin()],
    deleteTeacher
  );
  router.patch("/teachers/:id", [isTeacherExist,checkPermissionForAdmin()], updateTeacher);

  router.patch("/teachers/approve/:id",[isTeacherExist,checkPermissionForAdmin()],approveUser)

};
