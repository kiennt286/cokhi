import Product from "../models/Product.js";

const normalizeProductPayload = (payload) => {
  const nowIso = new Date().toISOString().slice(0, 10);

  return {
    slug: payload.slug,
    name: payload.name,
    brand: payload.brand,
    brandSlug: payload.brandSlug,
    price: Number(payload.price ?? 0),
    image: Array.isArray(payload.image) ? payload.image : [],
    description: payload.description || "",
    detailedDescription: payload.detailedDescription || "",
    category: payload.category || "",
    stock: Number(payload.stock ?? 0),
    rating: Number(payload.rating ?? 0),
    reviews: Number(payload.reviews ?? 0),
    bestseller: Boolean(payload.bestseller),
    discount: Number(payload.discount ?? 0),
    createdAtText: payload.createdAtText || payload.createdAt || nowIso,
  };
};

export const getPublicProducts = async (_req, res) => {
  const products = await Product.find({}).sort({ createdAt: -1 }).lean();
  res.json({ products });
};

export const getPublicProductByBrandSlug = async (req, res) => {
  const { brand, slug } = req.params;

  const product = await Product.findOne({
    brandSlug: { $regex: new RegExp(`^${brand}$`, "i") },
    slug,
  }).lean();

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  return res.json({ product });
};

export const getAdminProducts = async (_req, res) => {
  const products = await Product.find({}).sort({ createdAt: -1 }).lean();
  res.json({ products });
};

export const createProduct = async (req, res) => {
  const data = normalizeProductPayload(req.body);
  const product = await Product.create(data);
  res.status(201).json({ product });
};

export const updateProduct = async (req, res) => {
  const data = normalizeProductPayload(req.body);

  const product = await Product.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  return res.json({ product });
};

export const deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  return res.status(204).send();
};
