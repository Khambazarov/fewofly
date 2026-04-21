import { Router } from "express";
import { login } from "../login";

export const authRouter = Router();

authRouter.post("/login", async (request, response) => {
  const { username, password } = request.body as {
    username?: string;
    password?: string;
  };

  if (!username || !password) {
    response.status(400).json({
      message: "Username and password are required.",
    });
    return;
  }

  const user = await login({ username, password });

  if (!user) {
    response.status(401).json({
      message: "Invalid credentials.",
    });
    return;
  }

  response.json(user);
});
