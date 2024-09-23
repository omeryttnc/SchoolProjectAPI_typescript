import express from "express";

import { deleteStudentById, getStudentById, getStudents } from "../db/students";

export const getAllStudents = async (
  _req: express.Request,
  res: express.Response
) => {
  try {
    const students = await getStudents();
    return res.status(200).json(students);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: false,
      error: error,
    });
  }
};

export const deleteStudent = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const deletedStudent = await deleteStudentById(id);
    return res.status(202).json(deletedStudent).end();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, error: error }).end();
  }
};

export const updateStudent = async (
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

    const user = await getStudentById(id);
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
