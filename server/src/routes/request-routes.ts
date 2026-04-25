import { Router } from "express";
import { prisma } from "../db";
import { requireAuth } from "../auth-guards";

export const requestRouter = Router();

requestRouter.get("/", requireAuth, async (_request, response) => {
  const requests = await prisma.request.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      createdBy: {
        select: {
          id: true,
          username: true,
          role: true,
        },
      },
    },
  });

  response.json(requests);
});
