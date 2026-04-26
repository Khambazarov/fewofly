import type { Theme } from "../lib/theme";
import type { CurrentUser } from "../lib/auth-types";
import { getRoleLabel } from "../lib/role-labels";
import type { RequestItem } from "../lib/request-api";
import {
  formatRequestStatusLabel,
  REQUEST_STATUSES,
} from "../lib/request-status";

type DashboardCardProps = {
  theme: Theme;
  currentUser: CurrentUser;
  protectedMessage?: string;
  requests: RequestItem[];
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("de-DE");
}

function getNightCount(dateFrom: string, dateTo: string) {
  const from = new Date(dateFrom);
  const to = new Date(dateTo);
  const diffMs = to.getTime() - from.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  return diffDays > 0 ? diffDays : 0;
}

function getBudgetTotal(
  budgetPerPerson: number,
  peopleCount: number,
  dateFrom: string,
  dateTo: string,
) {
  const nightCount = getNightCount(dateFrom, dateTo);
  return budgetPerPerson * peopleCount * nightCount;
}

function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength).trim()}...`;
}

function getStatusBadgeClassName(theme: Theme, status: string) {
  if (status === REQUEST_STATUSES.NEW) {
    return theme === "dark"
      ? "inline-flex rounded-full border border-sky-700/40 bg-sky-500/10 px-2.5 py-1 text-xs font-semibold text-sky-300"
      : "inline-flex rounded-full border border-sky-600/30 bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-700";
  }

  if (status === REQUEST_STATUSES.OPEN) {
    return theme === "dark"
      ? "inline-flex rounded-full border border-emerald-700/40 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-300"
      : "inline-flex rounded-full border border-emerald-600/30 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700";
  }

  if (status === REQUEST_STATUSES.IN_PROGRESS) {
    return theme === "dark"
      ? "inline-flex rounded-full border border-amber-700/40 bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-300"
      : "inline-flex rounded-full border border-amber-600/30 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700";
  }

  if (status === REQUEST_STATUSES.CLOSED) {
    return theme === "dark"
      ? "inline-flex rounded-full border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs font-semibold text-slate-300"
      : "inline-flex rounded-full border border-slate-300 bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700";
  }

  return theme === "dark"
    ? "inline-flex rounded-full border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs font-semibold text-slate-300"
    : "inline-flex rounded-full border border-slate-300 bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700";
}

export default function DashboardCard({
  theme,
  currentUser,
  protectedMessage,
  requests,
}: DashboardCardProps) {
  const cardClassName =
    theme === "dark"
      ? "mx-auto mt-16 max-w-5xl rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-sm"
      : "mx-auto mt-16 max-w-5xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm";

  const titleClassName =
    theme === "dark"
      ? "text-2xl font-semibold text-slate-100"
      : "text-2xl font-semibold text-slate-900";

  const textClassName =
    theme === "dark" ? "text-sm text-slate-300" : "text-sm text-slate-700";

  const mutedTextClassName =
    theme === "dark" ? "text-xs text-slate-400" : "text-xs text-slate-500";

  const helperCardClassName =
    theme === "dark"
      ? "rounded-xl border border-slate-700/60 bg-slate-950/40 p-4"
      : "rounded-xl border border-slate-300/40 bg-slate-50/60 p-4";

  const latestRequests = requests.slice(0, 20);

  const newCount = requests.filter(
    (request) => request.status === REQUEST_STATUSES.NEW,
  ).length;
  const openCount = requests.filter(
    (request) => request.status === REQUEST_STATUSES.OPEN,
  ).length;
  const inProgressCount = requests.filter(
    (request) => request.status === REQUEST_STATUSES.IN_PROGRESS,
  ).length;
  const closedCount = requests.filter(
    (request) => request.status === REQUEST_STATUSES.CLOSED,
  ).length;
  const assignedCount = requests.filter(
    (request) => request.assignedTo?.id === currentUser.id,
  ).length;

  return (
    <section className={cardClassName}>
      <div className="space-y-5">
        <div className="space-y-2">
          <h2 className={titleClassName}>Dashboard</h2>
          <p className={textClassName}>Your current operations overview.</p>
          {protectedMessage ? (
            <p className={textClassName}>{protectedMessage}</p>
          ) : null}
          <p className={textClassName}>
            Active role: <strong>{getRoleLabel(currentUser.role)}</strong>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-center sm:grid-cols-6">
          <div className={helperCardClassName}>
            <p className={textClassName}>Requests</p>
            <p className="text-xl font-semibold">{requests.length}</p>
          </div>

          <div className={helperCardClassName}>
            <p className={textClassName}>New</p>
            <p className="text-xl font-semibold">{newCount}</p>
          </div>

          <div className={helperCardClassName}>
            <p className={textClassName}>Open</p>
            <p className="text-xl font-semibold">{openCount}</p>
          </div>

          <div className={helperCardClassName}>
            <p className={`${textClassName} text-nowrap`}>In Progress</p>
            <p className="text-xl font-semibold">{inProgressCount}</p>
          </div>

          <div className={helperCardClassName}>
            <p className={textClassName}>Closed</p>
            <p className="text-xl font-semibold">{closedCount}</p>
          </div>

          <div className={helperCardClassName}>
            <p className={textClassName}>Assigned</p>
            <p className="text-xl font-semibold">{assignedCount}</p>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Latest requests</h3>

          {latestRequests.length === 0 ? (
            <p className={textClassName}>No requests found.</p>
          ) : (
            <div className="space-y-3">
              {latestRequests.map((request) => (
                <div
                  key={request.id}
                  className="rounded-xl border border-slate-300/40 p-4"
                >
                  <div className="space-y-4">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                      <div className="space-y-1">
                        <p className="font-semibold">{request.title}</p>
                        <p>{request.companyName}</p>
                        <p className={mutedTextClassName}>
                          Created by:{" "}
                          <strong>{request.createdBy.username}</strong>
                        </p>
                        <p className={mutedTextClassName}>
                          Assigned to:{" "}
                          <strong>
                            {request.assignedTo
                              ? request.assignedTo.username
                              : "Unassigned"}
                          </strong>
                        </p>
                      </div>

                      <span
                        className={getStatusBadgeClassName(
                          theme,
                          request.status,
                        )}
                      >
                        {formatRequestStatusLabel(request.status)}
                      </span>
                    </div>

                    <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
                      <p className={mutedTextClassName}>
                        City: <strong>{request.locationCity}</strong>
                      </p>

                      <p className={mutedTextClassName}>
                        ZIP: <strong>{request.locationZIPcode}</strong>
                      </p>

                      <p className={mutedTextClassName}>
                        Street: <strong>{request.locationStreet}</strong>
                      </p>

                      <p className={mutedTextClassName}>
                        Distance:{" "}
                        <strong>{request.distanceFromDestinationKm} km</strong>
                      </p>

                      <p className={mutedTextClassName}>
                        People: <strong>{request.peopleCount}</strong>
                      </p>

                      <p className={mutedTextClassName}>
                        Budget: <strong>{request.budget} € pPN</strong>
                        {" | "}
                        <strong>
                          {getBudgetTotal(
                            request.budget,
                            request.peopleCount,
                            request.dateFrom,
                            request.dateTo
                          )}{" "}
                          €
                        </strong>{" "}
                        Total
                      </p>

                      <p className={mutedTextClassName}>
                        Date: <strong>{formatDate(request.dateFrom)}</strong>
                        {" - "}
                        <strong>{formatDate(request.dateTo)}</strong>
                      </p>

                      <p className={mutedTextClassName}>
                        Duration:{" "}
                        <strong>
                          {getNightCount(request.dateFrom, request.dateTo)}{" "}
                          nights
                        </strong>
                      </p>
                    </div>

                    <div className="grid gap-3">
                      <div className={helperCardClassName}>
                        <p className={mutedTextClassName}>Must have</p>
                        <p className={textClassName}>
                          {truncateText(request.mustHave, 100)}
                        </p>
                      </div>

                      <div className={helperCardClassName}>
                        <p className={mutedTextClassName}>Nice to have</p>
                        <p className={textClassName}>
                          {truncateText(request.niceToHave, 100)}
                        </p>
                      </div>

                      <div className={helperCardClassName}>
                        <p className={mutedTextClassName}>
                          Further information
                        </p>
                        <p className={textClassName}>
                          {truncateText(request.furtherInformation, 100)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
