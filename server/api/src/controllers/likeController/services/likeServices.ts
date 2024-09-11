import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import SecurityUtils from "../../../utils/SecurityUtils";

const security = new SecurityUtils();
const prisma = new PrismaClient();

export default class LikeServices {
  async likePost(req: Request, res: Response) {
    const { id } = req.params;
    const token = req.headers.authorization?.split(" ")[1];

    try {
      const userId = await security.authenticate(res, token);

      const likeExists = await prisma.like.findUnique({
        where: {
          postId_userId: {
            postId: id,
            userId: userId,
          },
        },
      });

      if (likeExists) {
        await prisma.like.delete({
          where: {
            postId_userId: {
              postId: id,
              userId: userId,
            },
          },
        });

        await prisma.post.update({
          where: { id: id },
          data: {
            likes: {
              decrement: 1,
            },
          },
        });

        return res.status(200).json({ info: "Like removed" });
      } else {
        await prisma.like.create({
          data: {
            postId: id,
            userId: userId,
          },
        });

        await prisma.post.update({
          where: {
            id: id,
          },
          data: {
            likes: {
              increment: 1,
            },
          },
        });

        return res.status(200).json({ info: "Liked" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error });
    }
  }
}
