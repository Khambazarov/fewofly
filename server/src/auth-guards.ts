import type { Request, Response, NextFunction } from "express";

export function requireAuth(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  if (!request.session.user) {
    response.status(401).json({
      message: "Not authenticated.",
    });
    return;
  }

  next();
}
