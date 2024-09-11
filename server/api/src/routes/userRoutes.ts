import { Router, Request, Response } from "express";
import { body, header, param } from "express-validator";
import validateRequest from "../middleware/validator";
import UserController from "../controllers/userController/userController";

const userRouter = Router();
const userController = new UserController();

userRouter.post(
  "/signup",
  [
    body("username").notEmpty().withMessage("Username is Required"),
    body("email").notEmpty().withMessage("Email is Required"),
    body("password")
      .notEmpty()
      .isLength({ min: 8, max: 32 })
      .withMessage(
        "Password have to be minimum 8 symbols long or isn't strong"
      ),
    body("phoneNumber").optional(),
  ],
  validateRequest,
  (req: Request, res: Response) => userController.createUser(req, res)
);

userRouter.post(
  "/signin",
  [
    body("username").notEmpty().withMessage("Username is Required"),
    body("password").notEmpty().withMessage("Password Is Required"),
  ],
  validateRequest,
  (req: Request, res: Response) => userController.signIn(req, res)
);

userRouter.get(
  "/profile/:id",
  [param("id").notEmpty().withMessage("UserId Is required")],
  validateRequest,
  (req: Request, res: Response) => userController.loadUserData(req, res)
);

userRouter.patch(
  "/profile/:id",
  [
    param("id").notEmpty().withMessage("UserId Is Required"),
    body("bio").isLength({ max: 255 }).withMessage("Bio is too long"),
    body("website").optional(),
    body("location").optional(),
  ],
  validateRequest,
  (req: Request, res: Response) => userController.updateUserProfile(req, res)
);

userRouter.get("/users", (req: Request, res: Response) =>
  userController.loadAllUsers(req, res)
);

export default userRouter;
