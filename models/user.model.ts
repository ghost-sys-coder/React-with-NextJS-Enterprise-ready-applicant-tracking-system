import { User } from "@/types";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema<User>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    imageUrl: { type: String, default: null },
    clerkUserId: { type: String, required: true, unique: true },
    userCurrentSubscription: {
      type: String,
      enum: [
        "free_plan",
        "starter_plan",
        "professional_plan",
        "enterprise_plan",
      ],
      default: "free_plan",
    }
  },
  { timestamps: true }
);

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);
export default UserModel;
