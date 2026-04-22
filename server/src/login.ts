import "dotenv/config";
import { prisma } from "./db";
import { verifyPassword } from "./auth";
import type { AuthUser } from "./routes/auth-types";

type LoginInput = {
  username: string;
  password: string;
};

export async function login({
  username,
  password,
}: LoginInput): Promise<AuthUser | null> {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user || !user.isActive) {
    return null;
  }

  const isValid = await verifyPassword(password, user.passwordHash);

  if (!isValid) {
    return null;
  }

  return {
    id: user.id,
    username: user.username,
    role: user.role,
  };
}
