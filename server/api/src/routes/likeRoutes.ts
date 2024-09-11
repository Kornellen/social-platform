import { Router, Request, Response } from "express";
import { param } from "express-validator";
import validateRequest from "../middleware/validator";
import LikeController from "../controllers/likeController/likeController";

const likeController = new LikeController();
const likeRouter = Router();

likeRouter.get(
  "/like/:id",
  [param("id").notEmpty().withMessage("Post ID is required")],
  validateRequest,
  (req: Request, res: Response) => likeController.like(req, res)
);

export default likeRouter;
