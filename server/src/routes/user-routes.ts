import { Router } from "express";
import { prisma } from "../db";
import { requireAuth } from "../auth-guards";

export const userRouter = Router();

userRouter.get("/", requireAuth, async (_request, response) => {
  const users = await prisma.user.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      username: "asc",
    },
    select: {
      id: true,
      username: true,
      role: true,
    },
  });

  response.json(users);
});
