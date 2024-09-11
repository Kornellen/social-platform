import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import SecurityUtils from "../../../utils/SecurityUtils";

const security = new SecurityUtils();
const prisma = new PrismaClient();

export default class CommentServices {
  async createComment(req: Request, res: Response) {
    const { content, postId } = req.body;
    const token = req.headers.authorization?.split(" ")[1];

    const userId = await security.authenticate(res, token);

    try {
      await prisma.comment.create({
        data: {
          content: content,
          postId: postId,
          userId: userId,
        },
      });
      return res.status(200).json({ info: "Comment created" });
    } catch (error) {
      console.error(`An Error occurried at creating commnet ${error}`);
      return res.status(500).json({ error: "Failed to create comment" });
    }
  }

  async removeComment(req: Request, res: Response) {
    const { id } = req.params;
    const token = req.headers.authorization?.split(" ")[1];

    const userId = await security.authenticate(res, token);

    const comment = await prisma.comment.findUnique({
      where: {
        id: id,
      },
    });

    if (userId != comment?.userId) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this comment" });
    }

    await prisma.comment.delete({
      where: {
        id: id,
      },
    });

    return res.status(200).json({ info: "Removed Comment" });
  }
}
