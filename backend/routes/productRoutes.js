import { Router } from "express";
import { getPublicProductByBrandSlug, getPublicProducts } from "../controllers/productController.js";

const router = Router();

router.get("/", getPublicProducts);
router.get("/:brand/:slug", getPublicProductByBrandSlug);

export default router;
