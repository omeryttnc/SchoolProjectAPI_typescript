import express from "express";

import { deleteTeacherById, getTeacherById, getTeachers } from "../db/teachers";

export const getAllTeachers = async (
  _req: express.Request,
  res: express.Response
) => {
  try {
    const teachers = await getTeachers();
    return res.status(200).json(teachers);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: false,
      error: error,
    });
  }
};

export const getTeacher = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const user = await getTeacherById(id);
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

export const deleteTeacher = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const deletedTeacher = await deleteTeacherById(id);
    return res.status(202).json(deletedTeacher).end();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, error: error }).end();
  }
};

export const updateTeacher = async (
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

    const user = await getTeacherById(id);
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

export const changeRoleStudent = async ( //TODO when we change role we need to delete user from current table and add on new respective table
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!role) {
      res.status(400).json({
        status: false,
        error: "you should enter role",
      });
    }

    const user = await getTeacherById(id);
    if (user) {
      user.role = role;
      user.save();
      res.status(200).json({
        status: true,
        info: `user updated new role is ${role}`,
      });
    } else {
      res.status(400).json({
        status: false,
        error: "you are not registered student",
      });
    }

  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, error: error }).end();
  }
};

