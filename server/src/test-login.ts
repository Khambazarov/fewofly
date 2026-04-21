import "dotenv/config";
import { login } from "./login";
import { prisma } from "./db";

async function main() {
  const result = await login({
    username: "supervisor",
    password: "0123456789",
  });

  console.log(result);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
