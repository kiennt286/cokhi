import "dotenv/config";
import { connectDb } from "../config/db.js";
import Product from "../models/Product.js";
import Post from "../models/Post.js";

const seedProducts = [
  {
    slug: "group-3",
    name: "Nhóm hình 3",
    brand: "Dụng cụ CNC Bắc Ninh",
    brandSlug: "dung-cu-cnc-bac-ninh",
    price: 0,
    image: [],
    description: "Hình nhóm sản phẩm 3. Liên hệ để được tư vấn và báo giá.",
    category: "Nam",
    stock: 999,
    rating: 5,
    reviews: 0,
    bestseller: true,
    discount: 0,
    createdAtText: "2026-05-04",
  },
  {
    slug: "group-4",
    name: "Nhóm hình 4",
    brand: "Dụng cụ CNC Bắc Ninh",
    brandSlug: "dung-cu-cnc-bac-ninh",
    price: 0,
    image: [],
    description: "Hình nhóm sản phẩm 4. Liên hệ để được tư vấn và báo giá.",
    category: "Nữ",
    stock: 999,
    rating: 5,
    reviews: 0,
    bestseller: true,
    discount: 0,
    createdAtText: "2026-05-04",
  },
];

const seedPosts = [
  {
    slug: "chon-dao-theo-vat-lieu-gia-cong",
    title: "Cách Chọn Dao Theo Vật Liệu Gia Công",
    excerpt: "Nguyên tắc chọn dao cho thép, inox, nhôm và gang để tăng tuổi thọ dao và giảm rung.",
    cover: "https://picsum.photos/seed/cokhi-post-1/1200/800",
    readTime: "6 phút đọc",
    content: [
      "Mỗi vật liệu gia công có đặc tính cắt gọt khác nhau nên cần nhóm dao phù hợp.",
      "Khi gia công inox, nên dùng mảnh sắc, thoát phoi tốt để hạn chế bavia và lẹo dao.",
    ],
    bullets: ["Thép: ưu tiên độ bền cạnh cắt và phủ chịu nhiệt."],
    status: "published",
    publishedAt: new Date(),
  },
  {
    slug: "thong-so-cat-tham-khao-cho-dao-phay",
    title: "Thông Số Cắt Tham Khảo Cho Dao Phay",
    excerpt: "Cách set tốc độ cắt, bước tiến và chiều sâu cắt để chạy ổn định từ lần đầu.",
    cover: "https://picsum.photos/seed/cokhi-post-2/1200/800",
    readTime: "5 phút đọc",
    content: [
      "Thiết lập thông số cắt nên bắt đầu từ khuyến nghị của hãng dao.",
      "Mục tiêu của giai đoạn setup ban đầu là ổn định quá trình cắt.",
    ],
    bullets: ["Luôn bắt đầu từ thông số bảo thủ."],
    status: "published",
    publishedAt: new Date(),
  },
  {
    slug: "dau-hieu-can-thay-manh-chip",
    title: "Dấu Hiệu Cần Thay Mảnh Chip",
    excerpt: "Nhận biết sớm các dấu hiệu mòn dao để giữ ổn định chất lượng.",
    cover: "https://picsum.photos/seed/cokhi-post-3/1200/800",
    readTime: "4 phút đọc",
    content: [
      "Bề mặt xấu đi nhanh dù giữ thông số thường là dấu hiệu cạnh cắt đã mòn.",
      "Tiếng cắt to hơn, rung tăng hoặc lực cắt tăng đột ngột cũng là tín hiệu cần thay mảnh.",
    ],
    bullets: ["Thay mảnh theo chu kỳ để ổn định chất lượng."],
    status: "published",
    publishedAt: new Date(),
  },
  {
    slug: "ren-helicoil-ren-cay-la-gi",
    title: "Ren Helicoil (ren cấy) là gì? Khi nào nên dùng",
    excerpt: "Giải thích ren cấy Helicoil và các trường hợp nên áp dụng.",
    cover: "https://picsum.photos/seed/cokhi-post-4/1200/800",
    readTime: "6 phút đọc",
    content: [
      "Ren cấy giúp phục hồi ren hỏng và tăng độ bền ren trên vật liệu mềm như nhôm.",
      "Cần thực hiện đúng quy trình khoan - taro - lắp để tránh lệch ren.",
    ],
    bullets: ["Phù hợp vị trí tháo lắp nhiều lần."],
    status: "published",
    publishedAt: new Date(),
  },
  {
    slug: "chon-manh-tien-theo-ung-dung",
    title: "Cách chọn mảnh tiện theo ứng dụng",
    excerpt: "Phân biệt mảnh tiện thô, tinh và cắt đứt để chọn đúng nhu cầu.",
    cover: "https://picsum.photos/seed/cokhi-post-5/1200/800",
    readTime: "7 phút đọc",
    content: [
      "Tiện thô ưu tiên độ bền cạnh cắt, tiện tinh ưu tiên cạnh sắc và ổn định.",
      "Cắt đứt yêu cầu thoát phoi tốt và độ vững gá cao.",
    ],
    bullets: ["Chọn chipbreaker theo vật liệu và tải cắt."],
    status: "published",
    publishedAt: new Date(),
  },
  {
    slug: "meo-giam-rung-khi-phay",
    title: "5 mẹo giảm rung khi phay",
    excerpt: "Các mẹo thực tế để giảm chatter và tăng ổn định gia công.",
    cover: "https://picsum.photos/seed/cokhi-post-6/1200/800",
    readTime: "5 phút đọc",
    content: [
      "Giảm nhô dao, tăng độ vững kẹp và điều chỉnh rpm/f để thoát vùng cộng hưởng.",
      "Nên thử giảm ap/ae trước khi tăng tải để tránh gãy dao.",
    ],
    bullets: ["Kiểm tra độ đảo và tình trạng mòn dao định kỳ."],
    status: "published",
    publishedAt: new Date(),
  },
  {
    slug: "phan-biet-dao-phay-2-me-3-me-4-me",
    title: "Chọn dao phay 2 me, 3 me hay 4 me?",
    excerpt: "Cách chọn số me theo vật liệu và mục tiêu gia công.",
    cover: "https://picsum.photos/seed/cokhi-post-7/1200/800",
    readTime: "6 phút đọc",
    content: [
      "Dao 2 me thoát phoi tốt cho nhôm, 3 me cân bằng, 4 me cứng vững cho thép/inox.",
      "Ngoài số me còn cần xét lớp phủ và góc xoắn.",
    ],
    bullets: ["Nhôm: 2-3 me, Thép/Inox: 3-4 me."],
    status: "published",
    publishedAt: new Date(),
  },
  {
    slug: "huong-dan-doc-ma-insert-tnmg-vnmg-cnmg",
    title: "Hướng dẫn đọc mã insert TNMG/VNMG/CNMG",
    excerpt: "Hiểu mã insert để đặt hàng đúng và thay thế nhanh.",
    cover: "https://picsum.photos/seed/cokhi-post-8/1200/800",
    readTime: "8 phút đọc",
    content: [
      "Mã insert thể hiện hình dạng, góc thoát, cấp chính xác và kiểu kẹp.",
      "Cụm số phía sau thể hiện kích thước và bán kính mũi.",
    ],
    bullets: ["Luôn đối chiếu holder trước khi đặt hàng."],
    status: "published",
    publishedAt: new Date(),
  },
  {
    slug: "khi-nao-dung-dao-phay-cau",
    title: "Khi nào nên dùng dao phay cầu trong CNC",
    excerpt: "Dao cầu phù hợp cho bề mặt 3D, khuôn mẫu và chi tiết cong.",
    cover: "https://picsum.photos/seed/cokhi-post-9/1200/800",
    readTime: "6 phút đọc",
    content: [
      "Dao phay cầu cho bề mặt mượt khi gia công 3D, nhưng cần tối ưu step-over để tránh sọc.",
      "Ở vùng near-tip cần chú ý tốc độ cắt hiệu dụng.",
    ],
    bullets: ["Giảm step-over để nâng chất lượng bề mặt."],
    status: "published",
    publishedAt: new Date(),
  },
  {
    slug: "nguyen-tac-chon-dau-kep-collet",
    title: "Nguyên tắc chọn đầu kẹp/collet để giảm đảo",
    excerpt: "Độ đảo thấp giúp tăng tuổi thọ dao và chất lượng bề mặt.",
    cover: "https://picsum.photos/seed/cokhi-post-10/1200/800",
    readTime: "5 phút đọc",
    content: [
      "Chọn đúng dải kẹp, vệ sinh côn và siết đúng lực giúp giảm runout.",
      "Kiểm tra bằng đồng hồ so để xử lý gãy dao nhỏ.",
    ],
    bullets: ["Không cố kẹp quá dải collet."],
    status: "published",
    publishedAt: new Date(),
  },
  {
    slug: "phoi-xanh-phoi-vang-phoi-den-noi-gi",
    title: "Phoi xanh - phoi vàng - phoi đen nói gì?",
    excerpt: "Đọc màu phoi để đánh giá nhiệt và tình trạng cắt.",
    cover: "https://picsum.photos/seed/cokhi-post-11/1200/800",
    readTime: "6 phút đọc",
    content: [
      "Phoi vàng thường ổn định, xanh/tím là nhiệt cao, đen có thể quá tải hoặc làm mát kém.",
      "Luôn kết hợp quan sát tiếng cắt và bề mặt để kết luận đúng.",
    ],
    bullets: ["Màu phoi chỉ là một chỉ báo, không phải tất cả."],
    status: "published",
    publishedAt: new Date(),
  },
];

const run = async () => {
  await connectDb(process.env.MONGO_URI);

  for (const product of seedProducts) {
    await Product.updateOne({ slug: product.slug }, { $set: product }, { upsert: true });
  }

  for (const post of seedPosts) {
    await Post.updateOne({ slug: post.slug }, { $set: post }, { upsert: true });
  }

  console.log("Seeded sample products and posts");
  process.exit(0);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
