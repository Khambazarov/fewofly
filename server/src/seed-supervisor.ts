import "dotenv/config";
import bcrypt from "bcrypt";
import { prisma } from "./db";

async function main() {
  const existingUser = await prisma.user.findUnique({
    where: {
      username: "supervisor",
    },
  });

  if (existingUser) {
    console.log("Supervisor user already exists");
    return;
  }

  const passwordHash = await bcrypt.hash("0123456789", 10);

  await prisma.user.create({
    data: {
      username: "supervisor",
      passwordHash,
      role: "supervisor",
      isActive: true,
    },
  });

  console.log("Supervisor user created");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
