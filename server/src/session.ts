import session from "express-session";

export const sessionMiddleware = session({
  secret: "$0123456789$",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  },
});
