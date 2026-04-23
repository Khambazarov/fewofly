import type { Theme } from "../lib/theme";
import type { CurrentUser } from "../lib/auth-types";

type LoggedInCardProps = {
  theme: Theme;
  currentUser: CurrentUser;
  onLogout: () => void;
  isLoggingOut: boolean;
};

export default function LoggedInCard({
  theme,
  currentUser,
  onLogout,
  isLoggingOut,
}: LoggedInCardProps) {
  const cardClassName =
    theme === "dark"
      ? "mx-auto mt-16 max-w-md rounded-2xl border border-emerald-700/40 bg-slate-900 p-6 shadow-sm"
      : "mx-auto mt-16 max-w-md rounded-2xl border border-emerald-600/30 bg-white p-6 shadow-sm";

  const titleClassName =
    theme === "dark"
      ? "text-2xl font-semibold text-slate-100"
      : "text-2xl font-semibold text-slate-900";

  const textClassName =
    theme === "dark" ? "text-sm text-slate-300" : "text-sm text-slate-700";

  const buttonClassName =
    theme === "dark"
      ? "w-full rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-200 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
      : "w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500";

  return (
    <section className={cardClassName}>
      <div className="space-y-5 text-center">
        <h2 className={titleClassName}>Logged in</h2>

        <div className="space-y-2">
          <p className={textClassName}>
            Welcome, <strong>{currentUser.username}</strong>.
          </p>
          <p className={textClassName}>Your role is {currentUser.role}.</p>
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
  );
}
