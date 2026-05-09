import "dotenv/config";

const API_BASE = process.env.SEED_API_BASE || "http://localhost:4000/api";

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

const requestJson = async (url, options = {}) => {
  const response = await fetch(url, options);
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data?.message || `Request failed: ${response.status}`);
  }
  return data;
};

const run = async () => {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    throw new Error("Missing ADMIN_EMAIL or ADMIN_PASSWORD in .env");
  }

  const login = await requestJson(`${API_BASE}/admin/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const token = login.token;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const current = await requestJson(`${API_BASE}/admin/products`, { headers: { Authorization: `Bearer ${token}` } });
  const bySlug = new Map((current.products || []).map((p) => [p.slug, p]));

  for (const [index, n] of groupNumbers.entries()) {
    const payload = buildProduct(n, index);
    const existing = bySlug.get(payload.slug);
    if (existing?._id) {
      await requestJson(`${API_BASE}/admin/products/${existing._id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(payload),
      });
    } else {
      await requestJson(`${API_BASE}/admin/products`, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });
    }
  }

  console.log(`Seeded ${groupNumbers.length} group products via API`);
};

run().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
