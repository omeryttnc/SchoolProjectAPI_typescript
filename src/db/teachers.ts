import mongoose from "mongoose";
import { TeacherSchema } from "../schema/teacherSchema";

export const TeacherModel = mongoose.model("Teacher", TeacherSchema);

export const getTeachers = () => TeacherModel.find();
export const getTeacherByEmail = (email: string) => TeacherModel.findOne({ email });
export const getTeacherBySessionToken = (sessionToken: string) =>
  TeacherModel.findOne({
    "authentication.sessionToken": sessionToken,
  });
export const getTeacherById = (id: string) => TeacherModel.findById(id);
export const createTeacher = (values: Record<string, any>) =>
  new TeacherModel(values).save().then((teacher) => teacher.toObject());
export const deleteTeacherById = (id: string) =>
  TeacherModel.findByIdAndDelete({ _id: id });
export const updateTeacherById = (id: string, values: Record<string, any>) =>
  TeacherModel.findByIdAndUpdate(id, values);
