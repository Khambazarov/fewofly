import type { RequestItem } from "./request-api";
import type { RequestEditFormState } from "./request-edit-types";

export function mapRequestToEditFormState(
  request: RequestItem,
): RequestEditFormState {
  return {
    id: request.id,
    companyName: request.companyName,
    contactPerson: request.contactPerson,
    phoneNumber: request.phoneNumber,
    emailAddress: request.emailAddress,
    title: request.title,
    status: request.status,
    dateFrom: request.dateFrom.slice(0, 10),
    dateTo: request.dateTo.slice(0, 10),
    peopleCount: String(request.peopleCount),
    locationCity: request.locationCity,
    locationZIPcode: request.locationZIPcode,
    locationStreet: request.locationStreet,
    distanceFromDestinationKm: String(request.distanceFromDestinationKm),
    budget: String(request.budget),
    mustHave: request.mustHave,
    niceToHave: request.niceToHave,
    furtherInformation: request.furtherInformation,
    assignedToId: request.assignedTo?.id ?? "",
  };
}
