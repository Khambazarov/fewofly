import type { Theme } from "../lib/theme";
import type { CurrentUser } from "../lib/auth-types";
import { getRoleLabel } from "../lib/role-labels";
import DashboardCard from "./DashboardCard";

type LoggedInCardProps = {
  theme: Theme;
  currentUser: CurrentUser;
  onLogout: () => void;
  isLoggingOut: boolean;
  protectedMessage?: string;
};

export default function LoggedInCard({
  theme,
  currentUser,
  onLogout,
  isLoggingOut,
  protectedMessage,
}: LoggedInCardProps) {
  const wrapperClassName = "mx-auto mt-16 max-w-3xl space-y-6";

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

  const buttonClassName =
    theme === "dark"
      ? "rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-200 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
      : "rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500";

  return (
    <div className={wrapperClassName}>
      <section className={topCardClassName}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <h2 className={titleClassName}>Logged in</h2>
            <p className={textClassName}>
              Welcome, <strong>{currentUser.username}</strong>.
            </p>
            <p className={textClassName}>
              Role: {getRoleLabel(currentUser.role)}
            </p>
          </div>

          <button
            type="button"
            onClick={onLogout}
            disabled={isLoggingOut}
            className={buttonClassName}
          >
            {isLoggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      </section>

      <DashboardCard
        theme={theme}
        currentUser={currentUser}
        protectedMessage={protectedMessage}
      />
    </div>
  );
}
