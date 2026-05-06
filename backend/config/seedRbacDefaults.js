import Permission from "../models/Permission.js";
import Role from "../models/Role.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { RBAC_PERMISSIONS, RBAC_ROLES } from "./rbac.js";

export const seedRbacDefaults = async () => {
  try {
    // 1. Khởi tạo Quyền
    for (const permission of RBAC_PERMISSIONS) {
      await Permission.updateOne({ code: permission.code }, { $set: permission }, { upsert: true });
    }

    // 2. Khởi tạo Vai trò
    for (const role of RBAC_ROLES) {
      await Role.updateOne({ name: role.name }, { $set: role }, { upsert: true });
    }

    // 3. Khởi tạo tài khoản Admin
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      console.log("⚠️ Thiếu ADMIN_EMAIL hoặc ADMIN_PASSWORD trong .env, bỏ qua tạo Admin.");
      return;
    }

    const adminExists = await User.findOne({ email: adminEmail });

    if (!adminExists) {
      console.log("🚀 Đang tạo tài khoản Admin mặc định...");
      
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      
      // Chỉnh sửa để khớp với User Schema của bạn
      await User.create({
        email: adminEmail,
        passwordHash: hashedPassword, // Sửa từ 'password' thành 'passwordHash'
        role: "admin"                  // Sửa từ ID sang String 'admin' để khớp với type: String
      });
      
      console.log("✅ Đã tạo tài khoản Admin thành công!");
    } else {
      console.log("ℹ️ Tài khoản Admin đã tồn tại trong Database.");
    }
  } catch (error) {
    console.error("❌ Lỗi trong quá trình Seed dữ liệu:", error.message);
  }
};