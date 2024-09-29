import express from "express";
import { createAdmin, getAdminByEmail } from "../db/admins";
import { createTeacher, getTeacherByEmail } from "../db/teachers";
import { createStudent, getStudentByEmail } from "../db/students";

import { authentication, random } from "../helpers";
import { roles } from "../../config";

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.send(400).json({
        status: false,
        error: "either email, password or role is wrong",
      });
    }

    const user = await getAdminByEmail(email).select(
      "+authentication.salt +authentication.password"
    );

    if (!user || !user.authentication?.salt) {
      return res.sendStatus(400).json({
        status: false,
        error: "User is not found",
      });
    }

    if (role != user.role) {
      return res.status(400).json({
        status: false,
        error: "role is not correct",
      });
    }

    const expectedHash = authentication(user.authentication.salt, password);

    if (user.authentication.password != expectedHash) {
      return res.send(403).json({
        status: false,
        error: "password is wrong",
      });
    }

    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );

    await user.save();

    res.cookie("sessionToken", user.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
    });

    res
      .status(200)
      .json({
        status: true,
        user,
      })
      .end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username, firstName, lastName, role } = req.body;
    if (!email || !password || !username) {
      return res.sendStatus(400);
    }
    let roleFromRequest = role;

    if (!roleFromRequest) {
      roleFromRequest = roles.STUDENT;
    }
    let existUser;
    switch (roleFromRequest) {
      case roles.ADMIN:
        existUser = await getAdminByEmail(email);
        break;
      case roles.TEACHER:
        existUser = await getTeacherByEmail(email);
        break;
      case roles.STUDENT:
        existUser = await getStudentByEmail(email);
        break;
      default:
        throw new Error("no valid roles");
    }

    if (existUser) {
      return res.sendStatus(400);
    }

    const salt = random();
    let user;

    switch (roleFromRequest) {
      case roles.ADMIN:
        user = await createAdmin({
          email,
          username,
          authentication: {
            salt,
            password: authentication(salt, password),
          },
          firstName,
          lastName,
        });
        break;
      case roles.TEACHER:
        user = await createTeacher({
          email,
          username,
          authentication: {
            salt,
            password: authentication(salt, password),
          },
          firstName,
          lastName,
        });
        break;
      case roles.STUDENT:
        user = await createStudent({
          email,
          username,
          authentication: {
            salt,
            password: authentication(salt, password),
          },
          firstName,
          lastName,
        });
        break;
      default:
        throw new Error("no valid roles");
    }

    return res
      .status(200)
      .json({
        status: true,
        user,
      })
      .end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
