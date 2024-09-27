import express from "express";

import { deleteAdminById, getAdminById, getAdmins } from "../db/admins";
import { roles } from "../../config";
import { getTeacherById } from "../db/teachers";
import { getStudentById } from "../db/students";

export const getAllAdmins = async (
  _req: express.Request,
  res: express.Response
) => {
  try {
    const admins = await getAdmins();
    return res.status(200).json(admins);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: false,
      error: error,
    });
  }
};
export const getAdmin = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const user = await getAdminById(id);
    console.log("student : " +user);
    res.status(200).json({
      status: true,
      data:user
    }).end();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, error: error }).end();
  }
};


export const deleteAdmin = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const deletedAdmin = await deleteAdminById(id);
    return res.status(202).json(deletedAdmin).end();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, error: error }).end();
  }
};

export const updateAdmin = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const username = req.body as string;

    if (!username) {
      return res
        .status(400)
        .json({ status: false, error: "you should enter usernam" })
        .end();
    }

    const user = await getAdminById(id);
    if (user) {
      user.username = username;
      await user.save();
      return res.status(202).json(user).end();
    } else {
      return res
        .status(404)
        .json({ status: false, error: "User not found" })
        .end();
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, error: error }).end();
  }
};

export const approveUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { role } = req.body;
    const { id } = req.params;

    let user;
    switch (role) {
      case roles.ADMIN:
        user = await getAdminById(id);
        break;

      case roles.TEACHER:
        user = await getTeacherById(id);
        break;

      case roles.STUDENT:
        user = await getStudentById(id);
        break;
    }

    if (user) {
      user.isApproved = true;
      await user?.save();
     return res.status(201).json({
        status:true,
        user:user
      })
    }else{
      return res.status(400).json({ status: false, error: "user not found to be approved" }).end();
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, error: error }).end();
  }
};

export const deactivateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { role } = req.body;
    const { id } = req.params;

    let user;
    switch (role) {
      case roles.ADMIN:
        user = await getAdminById(id);
        break;

      case roles.TEACHER:
        user = await getTeacherById(id);
        break;

      case roles.STUDENT:
        user = await getStudentById(id);
        break;
    }

    if (user) {
      user.isApproved = false;
      await user?.save();
     return res.status(201).json({
        status:true,
        user:user
      })
    }else{
      return res.status(400).json({ status: false, error: "user not found to be deactivated" }).end();
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, error: error }).end();
  }
};
