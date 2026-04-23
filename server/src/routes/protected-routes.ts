import { Router } from "express";
import { requireAuth } from "../auth-guards";
import { requireRole } from "../role-guards";

export const protectedRouter = Router();

protectedRouter.get("/dashboard", requireAuth, (request, response) => {
  response.json({
    message: "Protected dashboard data loaded successfully.",
    user: request.session.user,
  });
});

protectedRouter.get(
  "/supervisor",
  requireRole(["supervisor"]),
  (request, response) => {
    response.json({
      message: "Supervisor area loaded successfully.",
      user: request.session.user,
    });
  },
);
