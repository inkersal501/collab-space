import { Router } from "express";
import {authController} from "../controllers/index.js";
import { authMiddleware } from "../middlewares/index.js";

const router = Router();

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/google_auth", authController.google_auth); 
router.get("/refresh", authController.refresh);

router.use(authMiddleware);

router.get("/me", authController.me);
router.post("/logout", authController.logout);

export default router;