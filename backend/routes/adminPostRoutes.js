import { Router } from "express";
import { createPost, deletePost, getAdminPosts, updatePost } from "../controllers/postController.js";
import { authMiddleware, requirePermission } from "../middleware/authMiddleware.js";

const router = Router();

router.use(authMiddleware);
router.get("/", requirePermission("posts.read"), getAdminPosts);
router.post("/", requirePermission("posts.write"), createPost);
router.put("/:id", requirePermission("posts.write"), updatePost);
router.delete("/:id", requirePermission("posts.write"), deletePost);

export default router;
