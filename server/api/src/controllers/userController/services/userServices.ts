import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import SecurityUtils from "../../../utils/SecurityUtils";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const security = new SecurityUtils();
const prisma = new PrismaClient();

async function loadOnlyProfile(id: string, res: Response) {
  try {
    const userProfile = await prisma.userprofile.findUnique({
      where: { userId: id },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    if (!userProfile) {
      return res.status(404).json({ error: "User profile not found" });
    }

    return res.status(200).json({ userProfile: userProfile });
  } catch (error) {
    return res.sendStatus(500);
  }
}

export default class UserServices {
  async createUser(req: Request, res: Response) {
    const { username, password, phoneNumber, email } = req.body;

    const hashedPassword = await security.hashPassword(password);

    try {
      await prisma.user.create({
        data: {
          username: username,
          password: hashedPassword,
          phoneNumber: phoneNumber,
          email: email,
        },
      });

      const user = await prisma.user.findUnique({
        where: { username: username },
      });

      if (user) {
        await prisma.userprofile.create({
          data: {
            userId: user.id,
            bio: "",
            website: "",
            location: "",
            avatar: "",
          },
        });
      }
      return res.status(201).json({ info: "Account Created" });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        switch (error.code) {
          case "P2002":
            return res
              .status(400)
              .json({ error: "Username or email already in use" });
          default:
            return res.status(500).json({ error: "Database error occuried" });
        }
      }

      console.error(error);

      return res.sendStatus(500);
    }
  }

  async signin(req: Request, res: Response) {
    const { username, password } = req.body;
    try {
      const user = await prisma.user.findUnique({
        where: {
          username: username,
        },
      });
      if (!user) {
        return res.status(404).json({ error: "Invalid username or password" });
      }
      const isValidPassword = await security.comparePasswords(
        password,
        user.password
      );

      if (isValidPassword) {
        const token = await security.generateJWT(user.id);
        return res.status(200).json({ info: "Signed in", token: token });
      } else {
        return res.status(401).json({ error: "Invalid password" });
      }
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }

  async loadUserData(req: Request, res: Response) {
    const { id } = req.params;
    const token = req.headers.authorization?.split(" ")[1];

    try {
      const userID = await security.authenticate(res, token);

      if (userID != id) {
        return await loadOnlyProfile(id, res);
      }

      const user = await prisma.user.findUnique({
        where: { id: userID },
      });

      const userProfile = await prisma.userprofile.findUnique({
        where: { userId: userID },
      });

      if (!user) {
        return res.status(404).json({ error: "User Not Found" });
      }
      return res.status(200).json({ user: user, userProfile: userProfile });
    } catch (error) {
      console.error("Error loading user data:", error);
      return res
        .status(500)
        .json({ error: "An error occurred while loading user data." });
    }
  }

  async updateUserProfile(req: Request, res: Response) {
    const { id } = req.params;
    const token = req.headers.authorization?.split(" ")[1];

    const {
      bio,
      website,
      location,
    }: { bio?: string; website?: string; location?: string } = req.body;

    try {
      const userId = await security.authenticate(res, token);

      if (userId != id) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      await prisma.userprofile.update({
        where: {
          userId: id,
        },
        data: {
          bio: bio || "",
          website: website || "",
          location: location || "",
        },
      });
      return res
        .status(200)
        .json({ message: "User Profile Updated Successfully" });
    } catch (error) {
      console.error("Error updating user profile:", error);
      return res.status(500).json({ error: "Error Updating profile" });
    }
  }

  async loadAllUsers(req: Request, res: Response) {
    try {
      const users = await prisma.userprofile.findMany({
        include: {
          user: {
            select: {
              username: true,
            },
          },
        },
      });

      return res.status(200).json({ users: users });
    } catch (error) {
      console.error("Error loading all users:", error);
      return res.status(500).json({ error: "Error loading all users" });
    }
  }
}
