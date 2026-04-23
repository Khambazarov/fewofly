import "dotenv/config";
import bcrypt from "bcrypt";
import { prisma } from "./db";

const DEFAULT_PASSWORD = "0123456789";

async function upsertUser(username: string, role: string) {
  const passwordHash = await bcrypt.hash(DEFAULT_PASSWORD, 10);

  await prisma.user.upsert({
    where: { username },
    update: {
      passwordHash,
      role,
      isActive: true,
    },
    create: {
      username,
      passwordHash,
      role,
      isActive: true,
    },
  });
}

async function main() {
  await upsertUser("supervisor", "supervisor");
  await upsertUser("admin", "admin");
  await upsertUser("employee1", "employee");
  await upsertUser("employee2", "employee");

  console.log("Seed users upserted successfully");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
