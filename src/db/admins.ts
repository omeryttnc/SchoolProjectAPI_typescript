import mongoose from "mongoose";
import { AdminSchema } from "../schema/adminSchema";

export const AdminModel = mongoose.model("Admin", AdminSchema);

export const getAdmins = () => AdminModel.find();
export const getAdminByEmail = (email: string) => AdminModel.findOne({ email });
export const getAdminBySessionToken = (sessionToken: string) =>
  AdminModel.findOne({
    "authentication.sessionToken": sessionToken,
  });
export const getAdminById = (id: string) => AdminModel.findById(id);
export const createAdmin = (values: Record<string, any>) =>
  new AdminModel(values).save().then((user) => user.toObject());
export const deleteAdminById = (id: string) =>
  AdminModel.findByIdAndDelete({ _id: id });
export const updateAdminById = (id: string, values: Record<string, any>) =>
  AdminModel.findByIdAndUpdate(id, values);

export const approveUser=(id:string,role:string)=>{
}
