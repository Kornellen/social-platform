import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import colors from "colors";

import routes from "./src/routes";

colors.enable();
dotenv.config();

class Server {
  private app: Express;
  private port: number;
  private routes: any[];

  constructor() {
    this.app = express();
    this.port = Number(process.env.APP_PORT) || 5000;
    this.routes = routes;
  }

  private setUpMiddleware() {
    try {
      this.app.use(
        cors({
          origin: "*",
          methods: ["GET", "POST", "PUT", "DELETE"],
        })
      );
      this.app.use(express.json());

      console.log(`[Middleware ⚙️]: Middlewares Ready!`.gray);
    } catch (error) {
      console.error(
        `[Middleware ⚙️]: Error Setting Up Middlewares ${error}!`.red
      );
    }
  }

  private setUpPublic() {
    try {
      this.app.use(express.static(path.join(__dirname, "public")));
      console.log("[Public 🌍]: Public Ready!".gray);
    } catch (error) {
      console.error(`[Public 🌍]: Public Not Ready ${error}!`.red);
    }
  }

  private setUpRoutes() {
    try {
      this.routes.forEach((route) => {
        this.app.use("/api", route.handler);

        console.log(`[Routes 🔧]: Route /api/${route.path} Ready`.yellow);
      });

      console.log(`[Routes 🔧]: Routes Ready`.gray);
    } catch (error) {
      console.error(`[Routes 🔧]:Error Setting Up Routes ${error}!`.red);
    }
  }

  public start() {
    try {
      this.setUpMiddleware();
      this.setUpPublic();
      this.setUpRoutes();

      this.app.listen(this.port, () => {
        console.log(`[Server 🖥️]: Server is running on port ${this.port}`.blue);
      });
    } catch (error) {
      console.error(`[Server 🖥️]: Error has occuried ${error}!`.red);
    }
  }
}

new Server().start();
