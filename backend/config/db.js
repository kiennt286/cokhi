import mongoose from "mongoose";

export const connectDb = async () => {
  // Kiểm tra cả hai trường hợp tên biến bạn hay dùng
  const uri = process.env.MONGO_URI || process.env.MONGODB_URL;

  if (!uri) {
    throw new Error("MONGO_URI is required trong file .env");
  }

  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Lỗi kết nối MongoDB:", error.message);
    process.exit(1); // Thoát chương trình nếu không kết nối được
  }
};