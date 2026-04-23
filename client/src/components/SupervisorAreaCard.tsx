import type { Theme } from "../lib/theme";

type SupervisorAreaCardProps = {
  theme: Theme;
  message?: string;
};

export default function SupervisorAreaCard({
  theme,
  message,
}: SupervisorAreaCardProps) {
  const cardClassName =
    theme === "dark"
      ? "rounded-2xl border border-amber-700/40 bg-slate-900 p-6 shadow-sm"
      : "rounded-2xl border border-amber-600/30 bg-white p-6 shadow-sm";

  const titleClassName =
    theme === "dark"
      ? "text-xl font-semibold text-slate-100"
      : "text-xl font-semibold text-slate-900";

  const textClassName =
    theme === "dark" ? "text-sm text-slate-300" : "text-sm text-slate-700";

  return (
    <section className={cardClassName}>
      <div className="space-y-2">
        <h3 className={titleClassName}>Supervisor Area</h3>
        <p className={textClassName}>
          {message ?? "Supervisor-only area loaded successfully."}
        </p>
      </div>
    </section>
  );
}
