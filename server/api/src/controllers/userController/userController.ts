import { Request, Response } from "express";

import UserServices from "./services/userServices";

export default class UserController {
  private userServices: UserServices;

  constructor() {
    this.userServices = new UserServices();
  }

  createUser(req: Request, res: Response) {
    this.userServices.createUser(req, res);
  }

  signIn(req: Request, res: Response) {
    this.userServices.signin(req, res);
  }

  loadUserData(req: Request, res: Response) {
    this.userServices.loadUserData(req, res);
  }

  updateUserProfile(req: Request, res: Response) {
    this.userServices.updateUserProfile(req, res);
  }

  loadAllUsers(req: Request, res: Response) {
    this.userServices.loadAllUsers(req, res);
  }
}
