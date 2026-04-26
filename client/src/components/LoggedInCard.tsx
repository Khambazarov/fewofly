import type { Theme } from "../lib/theme";
import type { CurrentUser } from "../lib/auth-types";
import type { RequestItem } from "../lib/request-api";
import { getRoleLabel } from "../lib/role-labels";
import AdminAreaCard from "./AdminAreaCard";
import DashboardCard from "./DashboardCard";
import EmployeeAreaCard from "./EmployeeAreaCard";
import SupervisorAreaCard from "./SupervisorAreaCard";

type LoggedInCardProps = {
  theme: Theme;
  currentUser: CurrentUser;
  onLogout: () => void;
  onOpenCreateRequest: () => void;
  onEditRequest: (request: RequestItem) => void;
  isLoggingOut: boolean;
  protectedMessage?: string;
  employeeMessage?: string;
  adminMessage?: string;
  supervisorMessage?: string;
  requests: RequestItem[];
};

export default function LoggedInCard({
  theme,
  currentUser,
  onLogout,
  onOpenCreateRequest,
  onEditRequest,
  isLoggingOut,
  protectedMessage,
  employeeMessage,
  adminMessage,
  supervisorMessage,
  requests,
}: LoggedInCardProps) {
  const wrapperClassName = "mx-auto mt-16 max-w-5xl space-y-6";

  const topCardClassName =
    theme === "dark"
      ? "rounded-2xl border border-emerald-700/40 bg-slate-900 p-6 shadow-sm"
      : "rounded-2xl border border-emerald-600/30 bg-white p-6 shadow-sm";

  const titleClassName =
    theme === "dark"
      ? "text-2xl font-semibold text-slate-100"
      : "text-2xl font-semibold text-slate-900";

  const textClassName =
    theme === "dark" ? "text-sm text-slate-300" : "text-sm text-slate-700";

  const primaryButtonClassName =
    theme === "dark"
      ? "rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-200"
      : "rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:opacity-90";

  const secondaryButtonClassName =
    theme === "dark"
      ? "rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
      : "rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500";

  return (
    <div className={wrapperClassName}>
      <section className={topCardClassName}>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <h2 className={titleClassName}>Logged in</h2>
            <p className={textClassName}>
              Welcome, <strong>{currentUser.username}</strong>.
            </p>
            <p className={textClassName}>
              Role: {getRoleLabel(currentUser.role)}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onOpenCreateRequest}
              className={primaryButtonClassName}
            >
              Create New Request
            </button>

            <button
              type="button"
              onClick={onLogout}
              disabled={isLoggingOut}
              className={secondaryButtonClassName}
            >
              {isLoggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>
        </div>
      </section>

      <DashboardCard
        theme={theme}
        currentUser={currentUser}
        protectedMessage={protectedMessage}
        requests={requests}
        onEditRequest={onEditRequest}
      />

      <EmployeeAreaCard theme={theme} message={employeeMessage} />

      {currentUser.role === "admin" || currentUser.role === "supervisor" ? (
        <AdminAreaCard theme={theme} message={adminMessage} />
      ) : null}

      {currentUser.role === "supervisor" ? (
        <SupervisorAreaCard theme={theme} message={supervisorMessage} />
      ) : null}
    </div>
  );
}
