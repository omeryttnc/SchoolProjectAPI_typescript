import express from "express";

import { approveUser, deleteAdmin, getAllAdmins, updateAdmin } from "../controllers/admins";
import { checkPermissionForAdmin } from "../middlewares";
import { getAdminById } from "../db/admins";

export default (router: express.Router) => {
  router.get("/admins", checkPermissionForAdmin(), getAllAdmins);

  router.get(
    "/admins/:id",
    [ checkPermissionForAdmin()],
    getAdminById
  );
  
  router.delete(
    "/admins/:id",
    [checkPermissionForAdmin()],
    deleteAdmin
  );
  
  router.patch("/admins/:id", checkPermissionForAdmin(), updateAdmin);
  
  router.patch("/admins/approve/:id",[checkPermissionForAdmin()],approveUser)

};
