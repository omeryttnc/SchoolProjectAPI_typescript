import express from "express";

import { approveUser, deleteAdmin, getAllAdmins, updateAdmin } from "../controllers/admins";
import { checkPermissionForAdmin, isAdminExist } from "../middlewares";
import { getAdminById } from "../db/admins";

export default (router: express.Router) => {
  router.get("/admins", checkPermissionForAdmin(), getAllAdmins);

  router.get(
    "/admins/:id",
    [isAdminExist, checkPermissionForAdmin()],
    getAdminById
  );
  
  router.delete(
    "/admins/:id",
    [isAdminExist,checkPermissionForAdmin()],
    deleteAdmin
  );
  
  router.patch("/admins/:id", [isAdminExist,checkPermissionForAdmin()], updateAdmin);
  
  router.patch("/admins/approve/:id",[isAdminExist,checkPermissionForAdmin()],approveUser)

};
