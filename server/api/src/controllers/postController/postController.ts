import { Request, Response } from "express";
import PostServices from "./services/postServices";

export default class PostController {
  private postServices: PostServices;

  constructor() {
    this.postServices = new PostServices();
  }

  createPost(req: Request, res: Response) {
    this.postServices.createPost(req, res);
  }

  loadPost(req: Request, res: Response) {
    this.postServices.loadPost(req, res);
  }

  changePostVisabillity(req: Request, res: Response) {
    this.postServices.changePostVisabillity(req, res);
  }

  loadPublicPosts(req: Request, res: Response) {
    this.postServices.loadPublicPosts(req, res);
  }
}
