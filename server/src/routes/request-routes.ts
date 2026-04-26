import { Router } from "express";
import { prisma } from "../db";
import { requireAuth } from "../auth-guards";

export const requestRouter = Router();

requestRouter.get("/", requireAuth, async (_request, response) => {
  const requests = await prisma.request.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      createdBy: {
        select: {
          id: true,
          username: true,
          role: true,
        },
      },
      assignedTo: {
        select: {
          id: true,
          username: true,
          role: true,
        },
      },
    },
  });

  response.json(requests);
});

requestRouter.post("/", requireAuth, async (request, response) => {
  const {
    companyName,
    contactPerson,
    phoneNumber,
    emailAddress,
    title,
    status,
    dateFrom,
    dateTo,
    peopleCount,
    locationCity,
    locationZIPcode,
    locationStreet,
    distanceFromDestinationKm,
    budget,
    mustHave,
    niceToHave,
    furtherInformation,
    assignedToId,
  } = request.body as {
    companyName?: string;
    contactPerson?: string;
    phoneNumber?: string;
    emailAddress?: string;
    title?: string;
    status?: string;
    dateFrom?: string;
    dateTo?: string;
    peopleCount?: number;
    locationCity?: string;
    locationZIPcode?: string;
    locationStreet?: string;
    distanceFromDestinationKm?: number;
    budget?: number;
    mustHave?: string;
    niceToHave?: string;
    furtherInformation?: string;
    assignedToId?: string;
  };

  if (
    !companyName ||
    !contactPerson ||
    !phoneNumber ||
    !emailAddress ||
    !title ||
    !status ||
    !dateFrom ||
    !dateTo ||
    !peopleCount ||
    !locationCity ||
    !locationZIPcode ||
    !locationStreet ||
    distanceFromDestinationKm === undefined ||
    budget === undefined ||
    !mustHave ||
    !niceToHave ||
    !furtherInformation
  ) {
    response.status(400).json({
      message: "All request fields are required.",
    });
    return;
  }

  if (!request.session.user) {
    response.status(401).json({
      message: "Not authenticated.",
    });
    return;
  }

  const createdRequest = await prisma.request.create({
    data: {
      companyName,
      contactPerson,
      phoneNumber,
      emailAddress,
      title,
      status,
      dateFrom: new Date(dateFrom),
      dateTo: new Date(dateTo),
      peopleCount: Number(peopleCount),
      locationCity,
      locationZIPcode,
      locationStreet,
      distanceFromDestinationKm: Number(distanceFromDestinationKm),
      budget: Number(budget),
      mustHave,
      niceToHave,
      furtherInformation,
      createdById: request.session.user.id,
      assignedToId: assignedToId ? assignedToId : null,
    },
    include: {
      createdBy: {
        select: {
          id: true,
          username: true,
          role: true,
        },
      },
      assignedTo: {
        select: {
          id: true,
          username: true,
          role: true,
        },
      },
    },
  });

  response.status(201).json(createdRequest);
});
