import express from "express";
import { prisma } from "./db";
import { authRouter } from "./routes/auth-routes";

export function createApp() {
  const app = express();

  app.use(express.json());

  app.get("/health", async (_request, response) => {
    await prisma.$queryRaw`SELECT 1`;
    response.json({ status: "ok" });
  });

  app.use("/auth", authRouter);

  return app;
}
