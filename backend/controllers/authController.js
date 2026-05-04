import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Role from "../models/Role.js";

const signToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await User.findOne({ email: String(email).toLowerCase() });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatched = await bcrypt.compare(password, user.passwordHash);
  if (!isMatched) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = signToken(user._id);
  return res.json({
    token,
    user: {
      id: user._id,
      email: user.email,
      role: user.role,
    },
  });
};

export const getCurrentAdmin = async (req, res) => {
  const role = await Role.findOne({ name: req.auth.role }).lean();
  return res.json({
    user: {
      id: req.auth.userId,
      email: req.auth.email,
      role: req.auth.role,
      permissions: role?.permissions || [],
    },
  });
};
