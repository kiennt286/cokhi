import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    brandSlug: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0, default: 0 },
    image: [{ type: String, default: [] }],
    description: { type: String, default: "" },
    category: { type: String, default: "" },
    stock: { type: Number, default: 0 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviews: { type: Number, default: 0, min: 0 },
    bestseller: { type: Boolean, default: false },
    discount: { type: Number, default: 0, min: 0 },
    createdAtText: { type: String, default: "" },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
