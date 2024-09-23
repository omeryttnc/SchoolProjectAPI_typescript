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
