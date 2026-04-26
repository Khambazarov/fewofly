export const REQUEST_STATUSES = {
  NEW: "new",
  OPEN: "open",
  IN_PROGRESS: "in_progress",
  CLOSED: "closed",
} as const;

export type RequestStatus =
  (typeof REQUEST_STATUSES)[keyof typeof REQUEST_STATUSES];

export function formatRequestStatusLabel(status: string) {
  if (status === REQUEST_STATUSES.IN_PROGRESS) {
    return "In Progress";
  }

  return status.charAt(0).toUpperCase() + status.slice(1);
}
