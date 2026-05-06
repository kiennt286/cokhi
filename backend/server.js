import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDb } from "./config/db.js";
import { seedRbacDefaults } from "./config/seedRbacDefaults.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import adminProductRoutes from "./routes/adminProductRoutes.js";
import adminPostRoutes from "./routes/adminPostRoutes.js";
import { notFoundHandler, errorHandler } from "./middleware/errorMiddleware.js";

const app = express();

// Sử dụng cổng từ .env hoặc mặc định 4000
const port = Number(process.env.PORT) || 4000;

// Cấu hình Middleware
app.use(cors());
app.use(express.json({ limit: "2mb" }));

// Route kiểm tra sức khỏe hệ thống
app.get("/api/health", (_req, res) => {
  res.json({ ok: true, message: "Server is running smoothly!" });
});

// Khai báo các Routes API
app.use("/api/admin/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/admin/products", adminProductRoutes);
app.use("/api/admin/posts", adminPostRoutes);

// Xử lý lỗi (Phải đặt sau các Route)
app.use(notFoundHandler);
app.use(errorHandler);

/**
 * Hàm khởi động Server
 */
const startServer = async () => {
  try {
    // Lấy link DB từ .env (Khớp với MONGODB_URL bạn đã đặt)
    const dbConnectionString = process.env.MONGODB_URL || process.env.MONGO_URI;
    
    // Kết nối Database
    await connectDb(dbConnectionString);
    
    // Khởi tạo dữ liệu mẫu (RBAC)
    await seedRbacDefaults();

    // Bắt đầu lắng nghe các yêu cầu
    app.listen(port, () => {
      console.log(`================================================`);
      console.log(`🚀 Backend server đang chạy tại cổng: ${port}`);
      console.log(`📂 Chế độ: ${process.env.NODE_ENV || 'development'}`);
      console.log(`================================================`);
    });
  } catch (error) {
    console.error("❌ Không thể khởi động server:", error.message);
    process.exit(1);
  }
};

startServer();