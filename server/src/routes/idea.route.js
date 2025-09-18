import { Router } from "express";
import { ideaController } from "../controllers/index.js";
import { authMiddleware } from "../middlewares/index.js";
const router = Router();

// idea crud
router.get("/", ideaController.getIdeas);

router.use(authMiddleware);
router.post("/", ideaController.createIdea);
router.patch("/", ideaController.updateIdea);
router.delete("/", ideaController.deleteIdea);

router.post("/:id/like", ideaController.postLike); 
router.post("/:id/comment", ideaController.postComment);
router.delete("/:id/comment", ideaController.removeComment);
router.post("/:id/view", ideaController.viewCount); // view count
router.post("/:id/request", ideaController.collaborateRequest);
router.post("/:id/respond", ideaController.collaborateRespond);

export default router;

