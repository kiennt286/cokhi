import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Role from "../models/Role.js";
import Permission from "../models/Permission.js"; // Đảm bảo import để populate hoạt động

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token provided" });
    }

    // 1. Xác thực Token
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    
    // 2. Tìm User và nạp dữ liệu Role
    const user = await User.findById(payload.userId).lean();

    if (!user) {
      return res.status(401).json({ message: "Unauthorized - User not found" });
    }

    // 3. Tìm Role và lấy chi tiết các Permission (Populate mã code)
    // Giả sử trong model Role, trường permissions đang lưu mảng các ObjectId của Permission
    const roleData = await Role.findOne({ name: user.role })
      .populate("permissions")
      .lean();

    // 4. Trích xuất mảng các mã code (ví dụ: ['VIEW_ADMIN', 'MANAGE_PRODUCTS'])
    const permissionCodes = roleData?.permissions?.map(p => {
      return typeof p === 'object' ? p.code : p;
    }) || [];

    // 5. Gán thông tin vào req.auth để các middleware sau sử dụng
    req.auth = {
      userId: String(user._id),
      email: user.email,
      role: user.role,
      permissions: permissionCodes,
    };

    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    return res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};

/**
 * Middleware kiểm tra quyền cụ thể
 * @param {string} permissionCode - Mã quyền cần kiểm tra (VD: 'CREATE_PRODUCT')
 */
export const requirePermission = (permissionCode) => {
  return (req, res, next) => {
    const userPermissions = req.auth?.permissions || [];
    const userRole = req.auth?.role;

    // Đặc cách: Nếu là admin tối cao thì cho phép tất cả hành động
    if (userRole === 'admin') {
      return next();
    }

    // Kiểm tra xem mã quyền có trong danh sách quyền của User không
    if (!userPermissions.includes(permissionCode)) {
      return res.status(403).json({ message: `Forbidden - Bạn thiếu quyền: ${permissionCode}` });
    }

    next();
  };
};