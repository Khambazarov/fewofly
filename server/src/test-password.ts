import "dotenv/config";
import { prisma } from "./db";
import { verifyPassword } from "./auth";

async function main() {
  const user = await prisma.user.findUnique({
    where: {
      username: "supervisor",
    },
  });

  if (!user) {
    throw new Error("Supervisor user not found");
  }

  const isValid = await verifyPassword("0123456789", user.passwordHash);

  console.log({ isValid });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
