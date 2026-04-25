import express from "express";
import cors from "cors";
import { prisma } from "./db";
import { authRouter } from "./routes/auth-routes";
import { protectedRouter } from "./routes/protected-routes";
import { requestRouter } from "./routes/request-routes";
import { sessionMiddleware } from "./session";

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    }),
  );

  app.use(express.json());
  app.use(sessionMiddleware);

  app.get("/health", async (_request, response) => {
    await prisma.$queryRaw`SELECT 1`;
    response.json({ status: "ok" });
  });

  app.use("/auth", authRouter);
  app.use("/protected", protectedRouter);
  app.use("/requests", requestRouter);

  return app;
}
