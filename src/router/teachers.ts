import express from "express";

import { deleteTeacher, getAllTeachers, updateTeacher } from "../controllers/teachers";
import { checkPermissionForAdmin } from "../middlewares";
import { getTeacherById } from "../db/teachers";
import { approveUser } from "../controllers/admins";

export default (router: express.Router) => {
  router.get("/teachers", [checkPermissionForAdmin()], getAllTeachers);
  router.get(
    "/teachers/:id",
    [checkPermissionForAdmin()],
    getTeacherById
  );
  router.delete(
    "/teachers/:id",
    [ checkPermissionForAdmin()],
    deleteTeacher
  );
  router.patch("/teachers/:id", [checkPermissionForAdmin()], updateTeacher);

  router.patch("/teachers/approve/:id",[checkPermissionForAdmin()],approveUser)

};
