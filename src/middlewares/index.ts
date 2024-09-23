import { roles } from "../../config";
import express from "express";
import { getAdminByEmail,  getAdminBySessionToken } from "../db/admins";
import { getTeacherByEmail } from "../db/teachers";
import { getStudentByEmail } from "../db/students";

export const checkPermissionForAdmin = () => {
  return async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
    
      const sessionToken = req.cookies["sessionToken"];

      const existUser = await getAdminBySessionToken(sessionToken);

      if (!existUser) {
        return res
          .status(403)
          .json({
            status: false,
            error: " Invalid access token provided",
          })
          .end();
      }

      const userRole = existUser.role;

      if (userRole !== roles['ADMIN']) {
        return res.status(403).json({
          status: false,
          error: `You need to be a ADMIN to access this end point`,
        }).end;
      }
      next();
    } catch (error) {
      console.log(error);
      return res.status(400).json({ status: false, error: error }).end();
    }
  };
};

export const isApproved = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { email, role } = req.body;

    let user;
    switch (role) {
      case roles.ADMIN:
        user = await getAdminByEmail(email).select("+user.isApproved");
        break;

      case roles.TEACHER:
        user = await getTeacherByEmail(email).select("+user.isApproved");
        break;

      case roles.ADMIN:
        user = await getStudentByEmail(email).select("+user.isApproved");
        break;
      default:
        throw new Error("no valid roles");
    }

    const isApproved = user?.isApproved;
    if (!isApproved) {
      return res
        .status(403)
        .json({ status: false, error: "user is not approved" })
        .end();
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, error: error }).end();
  }
};
