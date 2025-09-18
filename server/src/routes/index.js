import authRoutes from "./auth.route.js";
import ideaRoutes from "./idea.route.js";
import { Router } from "express";
import { authMiddleware } from "../middlewares/index.js";

const router = Router();

router.use("/auth", authRoutes);

router.use("/idea", ideaRoutes);
// router.use(authMiddleware);

export default router;