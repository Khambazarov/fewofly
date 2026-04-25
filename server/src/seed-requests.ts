import "dotenv/config";
import { prisma } from "./db";

async function main() {
  const supervisor = await prisma.user.findUnique({
    where: { username: "supervisor" },
  });

  const admin = await prisma.user.findUnique({
    where: { username: "admin" },
  });

  const employee1 = await prisma.user.findUnique({
    where: { username: "employee1" },
  });

  const employee2 = await prisma.user.findUnique({
    where: { username: "employee2" },
  });

  if (!supervisor || !admin || !employee1 || !employee2) {
    throw new Error("Required seed users not found");
  }

  await prisma.request.deleteMany();

  await prisma.request.createMany({
    data: [
      {
        companyName: "Hamburg Assembly GmbH",
        contactPerson: "John Doe",
        phoneNumber: "+49 40 12345678",
        emailAddress: "john.doe@hamburg-assembly.de",
        title: "Hamburg assembly team accommodation",
        status: "open",
        dateFrom: new Date("2024-07-01"),
        dateTo: new Date("2024-07-15"),
        peopleCount: 4,
        locationCity: "Hamburg",
        locationZIPcode: "20095",
        locationStreet: "Mönckebergstraße 1",
        distanceFromDestinationKm: 5,
        budget: 30,
        mustHave: "Hotel with conference room for team meetings.",
        niceToHave: "Gym and wellness area.",
        furtherInformation:
          "We need accommodation for our assembly team during the project in Hamburg.",
        createdById: supervisor.id,
        assignedToId: employee1.id,
      },
      {
        companyName: "Berlin Projektbau AG",
        contactPerson: "Anna Schmidt",
        phoneNumber: "+49 30 98765432",
        emailAddress: "anna.schmidt@projektbau-berlin.de",
        title: "Berlin project workers housing",
        status: "in_progress",
        dateFrom: new Date("2024-08-10"),
        dateTo: new Date("2024-08-24"),
        peopleCount: 2,
        locationCity: "Berlin",
        locationZIPcode: "10115",
        locationStreet: "Invalidenstraße 10",
        distanceFromDestinationKm: 8,
        budget: 35,
        mustHave: "Single beds and parking spaces.",
        niceToHave: "Breakfast included.",
        furtherInformation:
          "The workers need easy access to the construction site in central Berlin.",
        createdById: admin.id,
        assignedToId: admin.id,
      },
      {
        companyName: "Leipzig Service Team UG",
        contactPerson: "Michael Weber",
        phoneNumber: "+49 341 4567890",
        emailAddress: "m.weber@leipzig-service.de",
        title: "Leipzig short-term stay request",
        status: "new",
        dateFrom: new Date("2024-09-01"),
        dateTo: new Date("2024-09-12"),
        peopleCount: 3,
        locationCity: "Leipzig",
        locationZIPcode: "04109",
        locationStreet: "Markt 5",
        distanceFromDestinationKm: 6,
        budget: 28,
        mustHave: "Wi-Fi and separate beds.",
        niceToHave: "Late check-in possible.",
        furtherInformation:
          "This is a short operational stay for a mobile service team.",
        createdById: employee1.id,
        assignedToId: employee2.id,
      },
      {
        companyName: "Munich Industrial Services",
        contactPerson: "Sophie Keller",
        phoneNumber: "+49 89 1234567",
        emailAddress: "s.keller@industrial-services.de",
        title: "Munich technician accommodation",
        status: "open",
        dateFrom: new Date("2024-10-05"),
        dateTo: new Date("2024-10-20"),
        peopleCount: 5,
        locationCity: "Munich",
        locationZIPcode: "80331",
        locationStreet: "Marienplatz 8",
        distanceFromDestinationKm: 10,
        budget: 40,
        mustHave: "Parking, separate beds and late arrival.",
        niceToHave: "Breakfast and laundry service.",
        furtherInformation:
          "Technician team needs flexible arrival and enough parking spaces for service vehicles.",
        createdById: supervisor.id,
        assignedToId: employee1.id,
      },
    ],
  });

  console.log("Request seed completed successfully");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
