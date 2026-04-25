import { API_BASE_URL } from "./api";
import type { RequestStatus } from "./request-status";

export type RequestItem = {
  id: string;
  companyName: string;
  contactPerson: string;
  phoneNumber: string;
  emailAddress: string;
  title: string;
  status: RequestStatus;
  dateFrom: string;
  dateTo: string;
  peopleCount: number;
  locationCity: string;
  locationZIPcode: string;
  locationStreet: string;
  distanceFromDestinationKm: number;
  budget: number;
  mustHave: string;
  niceToHave: string;
  furtherInformation: string;
  createdAt: string;
  lastUpdated: string;
  createdBy: {
    id: string;
    username: string;
    role: string;
  };
  assignedTo: {
    id: string;
    username: string;
    role: string;
  } | null;
};

export async function getRequestsRequest(): Promise<RequestItem[]> {
  const response = await fetch(`${API_BASE_URL}/requests`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Requests request failed");
  }

  return response.json();
}
