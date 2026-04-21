import bcrypt from "bcrypt";

export async function verifyPassword(
  plainPassword: string,
  passwordHash: string,
) {
  return bcrypt.compare(plainPassword, passwordHash);
}
