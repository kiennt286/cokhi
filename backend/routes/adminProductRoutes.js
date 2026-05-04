import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAdminProducts,
  updateProduct,
} from "../controllers/productController.js";
import { authMiddleware, requirePermission } from "../middleware/authMiddleware.js";

const router = Router();

router.use(authMiddleware);
router.get("/", requirePermission("products.read"), getAdminProducts);
router.post("/", requirePermission("products.write"), createProduct);
router.put("/:id", requirePermission("products.write"), updateProduct);
router.delete("/:id", requirePermission("products.write"), deleteProduct);

export default router;
