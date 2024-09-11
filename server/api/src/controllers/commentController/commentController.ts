import { Request, Response } from "express";
import CommentServices from "./services/commentServices";

export default class CommentController {
  private commentServices: CommentServices;

  constructor() {
    this.commentServices = new CommentServices();
  }

  createComment(req: Request, res: Response) {
    this.commentServices.createComment(req, res);
  }

  removeComment(req: Request, res: Response) {
    this.commentServices.removeComment(req, res);
  }
}
