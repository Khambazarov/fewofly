import type { Theme } from "../lib/theme";
import type { CurrentUser } from "../lib/auth-types";
import { getRoleLabel } from "../lib/role-labels";
import type { RequestItem } from "../lib/request-api";

type DashboardCardProps = {
  theme: Theme;
  currentUser: CurrentUser;
  protectedMessage?: string;
  requests: RequestItem[];
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("de-DE");
}

function getStatusBadgeClassName(theme: Theme, status: string) {
  const normalizedStatus = status.toLowerCase();

  if (normalizedStatus === "new") {
    return theme === "dark"
      ? "inline-flex rounded-full border border-sky-700/40 bg-sky-500/10 px-2.5 py-1 text-xs font-semibold text-sky-300"
      : "inline-flex rounded-full border border-sky-600/30 bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-700";
  }

  if (normalizedStatus === "open") {
    return theme === "dark"
      ? "inline-flex rounded-full border border-emerald-700/40 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-300"
      : "inline-flex rounded-full border border-emerald-600/30 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700";
  }

  if (normalizedStatus === "in_progress") {
    return theme === "dark"
      ? "inline-flex rounded-full border border-amber-700/40 bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-300"
      : "inline-flex rounded-full border border-amber-600/30 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700";
  }

  if (normalizedStatus === "closed") {
    return theme === "dark"
      ? "inline-flex rounded-full border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs font-semibold text-slate-300"
      : "inline-flex rounded-full border border-slate-300 bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700";
  }

  return theme === "dark"
    ? "inline-flex rounded-full border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs font-semibold text-slate-300"
    : "inline-flex rounded-full border border-slate-300 bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700";
}

function formatStatusLabel(status: string) {
  if (status === "in_progress") {
    return "In Progress";
  }

  return status.charAt(0).toUpperCase() + status.slice(1);
}

export default function DashboardCard({
  theme,
  currentUser,
  protectedMessage,
  requests,
}: DashboardCardProps) {
  const cardClassName =
    theme === "dark"
      ? "mx-auto mt-16 max-w-3xl rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-sm"
      : "mx-auto mt-16 max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm";

  const titleClassName =
    theme === "dark"
      ? "text-2xl font-semibold text-slate-100"
      : "text-2xl font-semibold text-slate-900";

  const textClassName =
    theme === "dark" ? "text-sm text-slate-300" : "text-sm text-slate-700";

  const mutedTextClassName =
    theme === "dark" ? "text-xs text-slate-400" : "text-xs text-slate-500";

  const latestRequests = requests.slice(0, 20);

  const newCount = requests.filter(
    (request) => request.status === "new",
  ).length;
  const openCount = requests.filter(
    (request) => request.status === "open",
  ).length;
  const inProgressCount = requests.filter(
    (request) => request.status === "in_progress",
  ).length;
  const closedCount = requests.filter(
    (request) => request.status === "closed",
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

        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 xl:grid-cols-6">
          <div className="rounded-xl border border-slate-300/40 p-4">
            <p className={textClassName}>Requests</p>
            <p className="text-xl font-semibold">{requests.length}</p>
          </div>

          <div className="rounded-xl border border-slate-300/40 p-4">
            <p className={textClassName}>New</p>
            <p className="text-xl font-semibold">{newCount}</p>
          </div>

          <div className="rounded-xl border border-slate-300/40 p-4">
            <p className={textClassName}>Open</p>
            <p className="text-xl font-semibold">{openCount}</p>
          </div>

          <div className="rounded-xl border border-slate-300/40 p-4">
            <p className={`${textClassName} text-nowrap`}>In Progress</p>
            <p className="text-xl font-semibold">{inProgressCount}</p>
          </div>

          <div className="rounded-xl border border-slate-300/40 p-4">
            <p className={textClassName}>Closed</p>
            <p className="text-xl font-semibold">{closedCount}</p>
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
                  <div className="space-y-3">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="space-y-1">
                        <p className="font-semibold">{request.title}</p>
                        <p className={textClassName}>
                          {request.companyName} · {request.locationCity} ·{" "}
                          {request.peopleCount} people
                        </p>
                      </div>

                      <span
                        className={getStatusBadgeClassName(
                          theme,
                          request.status,
                        )}
                      >
                        {formatStatusLabel(request.status)}
                      </span>
                    </div>

                    <div className="grid gap-2 sm:grid-cols-2">
                      <p className={mutedTextClassName}>
                        Created by:{" "}
                        <strong>{request.createdBy.username}</strong>
                      </p>

                      <p className={mutedTextClassName}>
                        Budget: <strong>{request.budget} €</strong>
                      </p>

                      <p className={mutedTextClassName}>
                        From: <strong>{formatDate(request.dateFrom)}</strong>
                      </p>

                      <p className={mutedTextClassName}>
                        To: <strong>{formatDate(request.dateTo)}</strong>
                      </p>
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
