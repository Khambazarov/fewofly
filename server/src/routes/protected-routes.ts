import { Router } from "express";
import { requireAuth } from "../auth-guards";

export const protectedRouter = Router();

protectedRouter.get("/dashboard", requireAuth, (request, response) => {
  response.json({
    message: "Protected dashboard data loaded successfully.",
    user: request.session.user,
  });
});
