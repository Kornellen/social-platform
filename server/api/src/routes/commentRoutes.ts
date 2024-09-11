import { Router, Request, Response } from "express";
import { body, param } from "express-validator";
import validateRequest from "../middleware/validator";
import CommentController from "../controllers/commentController/commentController";

const commentController = new CommentController();
const commentRouter = Router();

commentRouter.post(
  "/comment",
  [
    body("content").notEmpty().withMessage("Content is Required"),
    body("postId").notEmpty().withMessage("PostId is Required"),
  ],
  validateRequest,
  (req: Request, res: Response) => commentController.createComment(req, res)
);

commentRouter.delete("/comment/:id", [
  param("id").notEmpty().withMessage("CommentId Is required"),
]);

export default commentRouter;
