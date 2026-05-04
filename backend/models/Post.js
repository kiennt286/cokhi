import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    excerpt: { type: String, default: "" },
    cover: { type: String, default: "" },
    readTime: { type: String, default: "" },
    content: [{ type: String, default: [] }],
    bullets: [{ type: String, default: [] }],
    status: { type: String, enum: ["draft", "published"], default: "published" },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
