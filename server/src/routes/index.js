import authRoute from "./auth.route.js";
import { Router } from "express";
import { authMiddleware } from "../middlewares/index.js";

const router = Router();

router.use("/auth", authRoute);
router.use(authMiddleware);

export default router;