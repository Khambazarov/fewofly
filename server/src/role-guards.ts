import type { Request, Response, NextFunction } from "express";

export function requireRole(allowedRoles: string[]) {
  return function roleGuard(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const user = request.session.user;

    if (!user) {
      response.status(401).json({
        message: "Not authenticated.",
      });
      return;
    }

    if (!allowedRoles.includes(user.role)) {
      response.status(403).json({
        message: "Forbidden.",
      });
      return;
    }

    next();
  };
}
