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

  const hasPhoneNumber = Boolean(phoneNumber?.trim());
  const hasEmailAddress = Boolean(emailAddress?.trim());

  if (
    !contactPerson?.trim() ||
    !dateFrom ||
    !dateTo ||
    !peopleCount ||
    !locationCity?.trim() ||
    budget === undefined
  ) {
    response.status(400).json({
      message: "All required request fields must be provided.",
    });
    return;
  }

  if (!hasPhoneNumber && !hasEmailAddress) {
    response.status(400).json({
      message: "Either phone number or email address must be provided.",
    });
    return;
  }

  if (Number(peopleCount) <= 0) {
    response.status(400).json({
      message: "People count must be greater than 0.",
    });
    return;
  }

  if (Number(budget) < 0) {
    response.status(400).json({
      message: "Budget cannot be negative.",
    });
    return;
  }

  if (
    distanceFromDestinationKm !== undefined &&
    Number(distanceFromDestinationKm) < 0
  ) {
    response.status(400).json({
      message: "Distance cannot be negative.",
    });
    return;
  }

  if (new Date(dateTo) < new Date(dateFrom)) {
    response.status(400).json({
      message: "Date to must be on or after date from.",
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
      companyName: companyName?.trim() ?? "",
      contactPerson: contactPerson.trim(),
      phoneNumber: phoneNumber?.trim() ?? "",
      emailAddress: emailAddress?.trim() ?? "",
      title: title?.trim() ?? "",
      status: "new",
      dateFrom: new Date(dateFrom),
      dateTo: new Date(dateTo),
      peopleCount: Number(peopleCount),
      locationCity: locationCity.trim(),
      locationZIPcode: locationZIPcode?.trim() ?? "",
      locationStreet: locationStreet?.trim() ?? "",
      distanceFromDestinationKm:
        distanceFromDestinationKm !== undefined
          ? Number(distanceFromDestinationKm)
          : 0,
      budget: Number(budget),
      mustHave: mustHave?.trim() ?? "",
      niceToHave: niceToHave?.trim() ?? "",
      furtherInformation: furtherInformation?.trim() ?? "",
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
