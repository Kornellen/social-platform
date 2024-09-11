import LikeServices from "./services/likeServices";
import { Request, Response } from "express";

export default class LikeController {
  private likeServices: LikeServices;

  constructor() {
    this.likeServices = new LikeServices();
  }

  like(req: Request, res: Response) {
    this.likeServices.likePost(req, res);
  }
}
