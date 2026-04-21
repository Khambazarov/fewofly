import express from "express";
import { prisma } from "./db";

export function createApp() {
  const app = express();

  app.get("/health", async (_request, response) => {
    await prisma.$queryRaw`SELECT 1`;
    response.json({ status: "ok" });
  });

  return app;
}
