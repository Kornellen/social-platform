import { Router, Request, Response } from "express";
import { body, query } from "express-validator";

import PostController from "../controllers/postController/postController";
import validateRequest from "../middleware/validator";

const postController = new PostController();

const postRouter = Router();

postRouter.post(
  "/post",
  [
    body("title").notEmpty().withMessage("Title Is Required"),
    body("content").optional(),
    body("authorId").notEmpty().withMessage("AuthorId Is Required"),
    body("published").notEmpty().withMessage("Published Is Required"),
  ],
  validateRequest,
  (req: Request, res: Response) => postController.createPost(req, res)
);

postRouter.get(
  "/post",
  [query("id").notEmpty().withMessage("Query Param Id Is Required")],
  validateRequest,
  (req: Request, res: Response) => postController.loadPost(req, res)
);

postRouter.get("/posts", (req: Request, res: Response) =>
  postController.loadPublicPosts(req, res)
);

postRouter.patch(
  "/post",
  [query("id").notEmpty().withMessage("Query Param Id Is Required")],
  validateRequest,
  (req: Request, res: Response) =>
    postController.changePostVisabillity(req, res)
);

export default postRouter;
