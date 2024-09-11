import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import SecurityUtils from "../../../utils/SecurityUtils";

export default class PostServices {
  private security: SecurityUtils;
  private prisma: PrismaClient;

  constructor() {
    this.security = new SecurityUtils();
    this.prisma = new PrismaClient();
  }

  async createPost(req: Request, res: Response) {
    const { title, content, authorId, published } = req.body;

    try {
      await this.prisma.post.create({
        data: {
          title: title,
          content: content,
          authorId: authorId,
          published: published,
        },
      });

      return res.status(200).json({ info: "Post Created Successfull" });
    } catch (error) {
      console.error(`Error Creating Post ${error}`);
      return res.status(500).json({ info: "Error Creating Post" });
    }
  }

  async loadPost(req: Request, res: Response) {
    const { id } = req.query;

    try {
      const post = await this.prisma.post.findUnique({
        where: {
          id: String(id),
        },
      });

      if (!post) {
        return res.status(404).json({ error: "Post Not Found" });
      }

      const author = await this.prisma.user.findUnique({
        where: {
          id: post.authorId,
        },
      });

      const comments = await this.prisma.comment.findMany({
        where: {
          postId: post.id,
        },
      });

      const commentsAndAuthors = await Promise.all(
        comments.map(async (comment) => {
          const commentAuthor = await this.prisma.user.findUnique({
            where: {
              id: comment.userId,
            },
          });

          return {
            id: comment.id,
            content: comment.content,
            user: commentAuthor?.username,
            userId: comment.userId,
          };
        })
      );

      return res.status(200).json({
        id: post.id,
        title: post.title,
        content: post.content,
        author: author?.username,
        authorId: post.authorId,
        published: post.published,
        addedAt: post.addedAt,
        likes: post.likes,
        comments: commentsAndAuthors.map((comment) => comment),
      });
    } catch (error) {
      console.error(`Error Loading Post ${error}`);
      return res.status(500).json({ error: "Error Loading Post" });
    }
  }

  async changePostVisabillity(req: Request, res: Response) {
    const { id } = req.query;
    const token = req.headers.authorization?.split(" ")[1];

    try {
      const post = await this.prisma.post.findUnique({
        where: {
          id: String(id),
        },
      });

      if (!post) {
        return res.status(404).json({ error: "Post Not Found" });
      }

      const userId = await this.security.authenticate(res, token);

      const postVisabillty = post.published;

      if (userId !== post.authorId) {
        return res
          .status(403)
          .json({ error: "You are not the author of this post" });
      }
      await this.prisma.post.update({
        where: {
          id: String(id),
        },
        data: {
          published: !postVisabillty,
        },
      });

      return res.status(200).json({
        info: `Successfully chaged post visabillity from ${
          postVisabillty ? "public" : "private"
        } -> ${!postVisabillty ? "public" : "private"}`,
      });
    } catch (error) {
      console.error(`Error Changing Post Visibility ${error}`);
      return res.status(500).json({ error: "Error Changing Post Visibility" });
    }
  }

  async deletePost(req: Request, res: Response) {
    const { id } = req.query;
    const token = req.headers.authorization?.split(" ")[1];

    try {
      const userId = await this.security.authenticate(res, token);

      const post = await this.prisma.post.findUnique({
        where: {
          id: String(id),
        },
      });
      if (!post) {
        return res.status(404).json({ error: "Post Not Found" });
      }

      if (userId != post.authorId) {
        return res
          .status(403)
          .json({ error: "You do not have permission to delete this" });
      }

      await this.prisma.post.delete({
        where: {
          id: String(id),
        },
      });
    } catch (error) {
      console.error(`Error Deleting Post ${error}`);
      return res.status(500).json({ error: "Error Deleting Post" });
    }
  }

  async loadPublicPosts(req: Request, res: Response) {
    const token = req.headers.authorization?.split(" ")[1];

    try {
      if (!token) {
        const posts = await this.prisma.post.findMany({
          where: {
            published: true,
          },
          include: {
            user: {
              select: {
                username: true,
              },
            },
          },
        });

        return res.status(200).json({ posts: posts });
      } else {
        const decoded = await this.security.verifyJWT(token);

        const posts = await this.prisma.post.findMany({
          where: {
            OR: [
              {
                published: true,
              },
              {
                authorId: decoded?.userID,
              },
            ],
          },
          include: {
            user: {
              select: {
                username: true,
              },
            },
          },
        });

        return res.status(200).json({
          posts: posts.map((post) => {
            return {
              id: post.id,
              title: post.title,
              content: post.content,
              published: post.published,
              user: { username: post.user.username },
              authorId: post.authorId,
              addedAt: post.addedAt,
              likes: post.likes,
            };
          }),
        });
      }
    } catch (error) {
      console.error(`Error Loading Posts ${error}`);
      return res.status(500).json({ error: "Error Loading Posts" });
    }
  }
}
