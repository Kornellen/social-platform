import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Response } from "express";

dotenv.config();

export default class SecurityUtils {
  private saltRounds: number = 10;
  private secretKey: string;

  constructor() {
    if (!process.env.SECRET_KEY) {
      throw new Error("SECRET_KEY must be set in .env file");
    }
    this.secretKey = process.env.SECRET_KEY;
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async comparePasswords(
    password: string,
    passwordDB: string
  ): Promise<boolean> {
    return bcrypt.compare(password, passwordDB);
  }

  async generateJWT(userID: string): Promise<string> {
    return jwt.sign({ userID: userID }, this.secretKey, { expiresIn: "1h" });
  }

  async verifyJWT(token: string): Promise<any> {
    try {
      return jwt.verify(token, this.secretKey);
    } catch (error) {
      return "false";
    }
  }

  async authenticate(res: Response, token: string | undefined): Promise<any> {
    try {
      if (!token || typeof token == undefined) {
        return false;
      }
      const decoded = await this.verifyJWT(token);

      return decoded?.userID;
    } catch (error) {
      return res.status(500).json({ error: "Error Authenticating Token" });
    }
  }
}
