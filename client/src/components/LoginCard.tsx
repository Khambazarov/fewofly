import type { Theme } from "../lib/theme";
import type { LoginRole } from "../lib/auth";
import RoleSwitch from "./RoleSwitch";

type LoginCardProps = {
  theme: Theme;
  selectedRole: LoginRole;
  onSelectRole: (role: LoginRole) => void;
};

export default function LoginCard({
  theme,
  selectedRole,
  onSelectRole,
}: LoginCardProps) {
  const cardClassName =
    theme === "dark"
      ? "mx-auto mt-16 max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-sm"
      : "mx-auto mt-16 max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm";

  const titleClassName =
    theme === "dark"
      ? "text-center text-2xl font-semibold text-slate-100"
      : "text-center text-2xl font-semibold text-slate-900";

  const descriptionClassName =
    theme === "dark"
      ? "text-center text-sm text-slate-400"
      : "text-center text-sm text-slate-600";

  return (
    <section className={cardClassName}>
      <div className="space-y-5">
        <h2 className={titleClassName}>Login</h2>

        <RoleSwitch
          selectedRole={selectedRole}
          onSelectRole={onSelectRole}
          theme={theme}
        />

        <p className={descriptionClassName}>
          Sign in to access internal inquiry and operations workflows.
        </p>
      </div>
    </section>
  );
}
