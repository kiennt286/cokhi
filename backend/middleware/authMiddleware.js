import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Role from "../models/Role.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.userId).lean();

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const role = await Role.findOne({ name: user.role }).lean();

    req.auth = {
      userId: String(user._id),
      email: user.email,
      role: user.role,
      permissions: role?.permissions || [],
    };

    next();
  } catch (_error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const requirePermission = (permissionCode) => {
  return (req, res, next) => {
    const permissions = req.auth?.permissions || [];

    if (!permissions.includes(permissionCode)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
};
