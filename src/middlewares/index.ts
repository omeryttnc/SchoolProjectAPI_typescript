import { roles } from "../../config";
import express from "express";
import {
  getAdminByEmail,
  getAdminById,
  getAdminBySessionToken,
} from "../db/admins";
import { getTeacherByEmail, getTeacherById } from "../db/teachers";
import { getStudentByEmail, getStudentById } from "../db/students";

export const checkPermissionForAdmin = () => {
  return async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const sessionToken = req.cookies["sessionToken"];
      if (!sessionToken) {
        res
          .send(500)
          .json({ status: false, error: "there is no session token" })
          .end();
      }
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

      if (userRole !== roles["ADMIN"]) {
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

export const isStudentExist = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await getStudentById(id);
    console.log("user :  " + user);
    if (!user) {
      res.status(400).json({
        status: false,
        error: "Student does not exist",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, error: error }).end();
  }
};

export const isTeacherExist = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await getTeacherById(id);
    if (!user) {
      res
        .status(400)
        .json({
          status: false,
          error: "Teacher does not exist",
        })
        .end();
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, error: error }).end();
  }
};

export const isAdminExist = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await getAdminById(id);
    if (!user) {
      res.status(400).json({
        status: false,
        error: "Admin does not exist",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, error: error }).end();
  }
};
