import { DEFAULT_LANGUAGE, LANGUAGES } from "@constants/index";
import mongoose, { Document } from "mongoose";
import { Product } from "./product";

export interface User {
  _id: string;
  username: string;
  name: string;
  lastActivity: Date;
  language: "en" | "ru";
  created: Date;
  products: Product[];
}
export type UserDocument = User & Document;

export const UserSchema = new mongoose.Schema(
  {
    _id: String,
    username: String,
    name: String,
    lastActivity: {
      type: Date,
      default: new Date(),
    },
    created: {
      type: Date,
      default: new Date(),
    },
    language: {
      type: String,
      enum: LANGUAGES,
      default: DEFAULT_LANGUAGE,
    },
  },
  {
    _id: false,
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true }, // So `toObject()` output includes virtuals }
  }
);
UserSchema.virtual("products", {
  ref: "Product", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "userId", // is equal to `foreignField`
  // If `justOne` is true, 'members' will be a single doc as opposed to
  // an array. `justOne` is false by default.
  justOne: false,
});
const UserModel = mongoose.model<UserDocument>("User", UserSchema);
export default UserModel;
