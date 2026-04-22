import type { AuthUser } from "./routes/auth-types";

declare module "express-session" {
  interface SessionData {
    user?: AuthUser;
  }
}
