import mongoose, { Schema, Document } from "mongoose";

export interface UserDocument extends Document {
  clerkId: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<UserDocument>(
  {
    clerkId: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const User =
  mongoose.models.User || mongoose.model<UserDocument>("User", UserSchema);

export default User;
