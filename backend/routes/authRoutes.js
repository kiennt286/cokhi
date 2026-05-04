import { Router } from "express";
import { getCurrentAdmin, loginAdmin } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/login", loginAdmin);
router.get("/me", authMiddleware, getCurrentAdmin);

export default router;
