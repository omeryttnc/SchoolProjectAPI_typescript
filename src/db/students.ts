import mongoose from "mongoose";
import { StudentSchema } from "../schema/studentSchema";

export const StudentModel = mongoose.model("Student", StudentSchema);

export const getStudents = () => StudentModel.find();
export const getStudentByEmail = (email: string) => StudentModel.findOne({ email });
export const getStudentBySessionToken = (sessionToken: string) =>
  StudentModel.findOne({
    "authentication.sessionToken": sessionToken,
  });
export const getStudentById = (id: string) => StudentModel.findById(id);
export const createStudent = (values: Record<string, any>) =>
  new StudentModel(values).save().then((student) => student.toObject());
export const deleteStudentById = (id: string) =>
  StudentModel.findByIdAndDelete({ _id: id });
export const updateStudentById = (id: string, values: Record<string, any>) =>
  StudentModel.findByIdAndUpdate(id, values);
