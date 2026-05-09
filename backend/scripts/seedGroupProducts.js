import "dotenv/config";
import { connectDb } from "../config/db.js";
import Product from "../models/Product.js";

const groupNumbers = [
  3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 29, 30, 83, 84, 85, 86,
];

const buildProduct = (n, index) => ({
  slug: `group-${n}`,
  name: `Sản phẩm Group ${n}`,
  brand: "Dụng cụ CNC Bắc Ninh",
  brandSlug: "dung-cu-cnc-bac-ninh",
  price: 0,
  image: [`/src/assets/Group${n}.png`],
  description: `Sản phẩm Group ${n}. Vui lòng liên hệ để được tư vấn và báo giá.`,
  detailedDescription:
    `Thông tin chi tiết cho sản phẩm Group ${n}.\n` +
    "Bạn có thể cập nhật nội dung mô tả chi tiết này trong trang Admin.",
  category: index % 2 === 0 ? "Dụng cụ cắt gọt" : "Phụ kiện cơ khí",
  stock: 999,
  rating: 5,
  reviews: 0,
  bestseller: true,
  discount: 0,
  createdAtText: "2026-05-08",
});

const run = async () => {
  await connectDb();

  for (const [index, n] of groupNumbers.entries()) {
    const product = buildProduct(n, index);
    await Product.updateOne({ slug: product.slug }, { $set: product }, { upsert: true });
  }

  console.log(`Seeded ${groupNumbers.length} group products`);
  process.exit(0);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
