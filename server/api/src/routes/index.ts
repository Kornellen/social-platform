import commentRouter from "./commentRoutes";
import likeRouter from "./likeRoutes";
import postRouter from "./postRoutes";
import userRouter from "./userRoutes";

export default [
  { path: "users", handler: userRouter },
  { path: "posts", handler: postRouter },
  { path: "comments", handler: commentRouter },
  { path: "likes", handler: likeRouter },
];
