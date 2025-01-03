import { model, models, Schema } from "mongoose";

export interface IUser {
  userId: string; // Clerk user ID
  firstName: string;
  lastName: string;
  email: string; // Gmail address
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    userId: { type: String, required: true, unique: true }, // Clerk user ID
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Ensure unique Gmail
  },
  {
    timestamps: true, // Automatically creates `createdAt` and `updatedAt`
  }
);

export const User = models?.User || model<IUser>("User", UserSchema);
