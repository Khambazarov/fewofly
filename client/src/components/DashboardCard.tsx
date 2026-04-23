import type { Theme } from "../lib/theme";
import type { CurrentUser } from "../lib/auth-types";

type DashboardCardProps = {
  theme: Theme;
  currentUser: CurrentUser;
};

export default function DashboardCard({
  theme,
  currentUser,
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

  return (
    <section className={cardClassName}>
      <div className="space-y-4">
        <div className="space-y-2">
          <h2 className={titleClassName}>Dashboard</h2>
          <p className={textClassName}>
            Logged in as <strong>{currentUser.username}</strong> with role{" "}
            <strong>{currentUser.role}</strong>.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-300/40 p-4">
            <p className={textClassName}>Requests</p>
            <p className="text-xl font-semibold">0</p>
          </div>

          <div className="rounded-xl border border-slate-300/40 p-4">
            <p className={textClassName}>Open</p>
            <p className="text-xl font-semibold">0</p>
          </div>

          <div className="rounded-xl border border-slate-300/40 p-4">
            <p className={textClassName}>Assigned to me</p>
            <p className="text-xl font-semibold">0</p>
          </div>
        </div>
      </div>
    </section>
  );
}
