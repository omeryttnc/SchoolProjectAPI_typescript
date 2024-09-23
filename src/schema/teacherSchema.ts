import mongoose from "mongoose";
import { roles } from "../../config";

export const TeacherSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: String, default: roles.TEACHER },
  isApproved:{type:Boolean, default: false}
});
