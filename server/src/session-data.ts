export type SessionUser = {
  id: string;
  username: string;
  role: string;
};

declare module "express-session" {
  interface SessionData {
    user?: SessionUser;
  }
}
