import type { RequestStatus } from "./request-status";

export type RequestEditFormState = {
  id: string;
  companyName: string;
  contactPerson: string;
  phoneNumber: string;
  emailAddress: string;
  title: string;
  status: RequestStatus;
  dateFrom: string;
  dateTo: string;
  peopleCount: string;
  locationCity: string;
  locationZIPcode: string;
  locationStreet: string;
  distanceFromDestinationKm: string;
  budget: string;
  mustHave: string;
  niceToHave: string;
  furtherInformation: string;
  assignedToId: string;
};
