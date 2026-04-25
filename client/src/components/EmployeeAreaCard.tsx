import type { Theme } from "../lib/theme";

type EmployeeAreaCardProps = {
  theme: Theme;
  message?: string;
};

export default function EmployeeAreaCard({
  theme,
  message,
}: EmployeeAreaCardProps) {
  const cardClassName =
    theme === "dark"
      ? "rounded-2xl border border-violet-700/40 bg-slate-900 p-6 shadow-sm"
      : "rounded-2xl border border-violet-600/30 bg-white p-6 shadow-sm";

  const titleClassName =
    theme === "dark"
      ? "text-xl font-semibold text-slate-100"
      : "text-xl font-semibold text-slate-900";

  const textClassName =
    theme === "dark" ? "text-sm text-slate-300" : "text-sm text-slate-700";

  return (
    <section className={cardClassName}>
      <div className="space-y-2">
        <h3 className={titleClassName}>Employee Area</h3>
        <p className={textClassName}>
          {message ?? "Employee area loaded successfully."}
        </p>
      </div>
    </section>
  );
}
