import type { LoginRole } from "../lib/auth";
import type { Theme } from "../lib/theme";

type RoleSwitchProps = {
  selectedRole: LoginRole;
  onSelectRole: (role: LoginRole) => void;
  theme: Theme;
};

export default function RoleSwitch({
  selectedRole,
  onSelectRole,
  theme,
}: RoleSwitchProps) {
  const wrapperClassName =
    theme === "dark"
      ? "relative mx-auto flex w-56 border-b border-slate-700"
      : "relative mx-auto flex w-56 border-b border-slate-300";

  const buttonClassName =
    theme === "dark"
      ? "relative z-10 flex-1 pb-2 text-center text-sm font-medium text-slate-400 transition-colors duration-200"
      : "relative z-10 flex-1 pb-2 text-center text-sm font-medium text-slate-500 transition-colors duration-200";

  const activeButtonClassName =
    theme === "dark" ? "text-slate-100" : "text-slate-900";

  const indicatorClassName =
    theme === "dark"
      ? "absolute bottom-[-1px] left-0 h-0.5 w-28 rounded-full bg-slate-100 transition-transform duration-300 ease-out"
      : "absolute bottom-[-1px] left-0 h-0.5 w-28 rounded-full bg-slate-900 transition-transform duration-300 ease-out";

  return (
    <div className={wrapperClassName}>
      <button
        type="button"
        onClick={() => onSelectRole("employee")}
        className={`${buttonClassName} ${
          selectedRole === "employee" ? activeButtonClassName : ""
        }`}
      >
        Employee
      </button>

      <button
        type="button"
        onClick={() => onSelectRole("admin")}
        className={`${buttonClassName} ${
          selectedRole === "admin" ? activeButtonClassName : ""
        }`}
      >
        Admin
      </button>

      <span
        className={indicatorClassName}
        style={{
          transform:
            selectedRole === "employee" ? "translateX(0)" : "translateX(112px)",
        }}
      />
    </div>
  );
}
