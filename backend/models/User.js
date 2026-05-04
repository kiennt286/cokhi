import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    passwordHash: { type: String, required: true },
    role: { type: String, required: true, default: "editor", trim: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
