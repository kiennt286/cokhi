import Post from "../models/Post.js";

const normalizePostPayload = (payload) => {
  return {
    slug: payload.slug,
    title: payload.title,
    excerpt: payload.excerpt || "",
    cover: payload.cover || "",
    readTime: payload.readTime || "",
    content: Array.isArray(payload.content) ? payload.content : [],
    bullets: Array.isArray(payload.bullets) ? payload.bullets : [],
    status: payload.status === "draft" ? "draft" : "published",
    publishedAt: payload.status === "draft" ? null : payload.publishedAt || new Date(),
  };
};

export const getPublicPosts = async (_req, res) => {
  const posts = await Post.find({ status: "published" }).sort({ publishedAt: -1 }).lean();
  res.json({ posts });
};

export const getPublicPostBySlug = async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug, status: "published" }).lean();

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  return res.json({ post });
};

export const getAdminPosts = async (_req, res) => {
  const posts = await Post.find({}).sort({ createdAt: -1 }).lean();
  res.json({ posts });
};

export const createPost = async (req, res) => {
  const data = normalizePostPayload(req.body);
  const post = await Post.create(data);
  res.status(201).json({ post });
};

export const updatePost = async (req, res) => {
  const data = normalizePostPayload(req.body);
  const post = await Post.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true,
  });

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  return res.json({ post });
};

export const deletePost = async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  return res.status(204).send();
};
