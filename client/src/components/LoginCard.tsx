import type { Theme } from "../lib/theme";
import type { LoginRole } from "../lib/auth";
import RoleSwitch from "./RoleSwitch";
import TextInput from "./TextInput";
import PrimaryButton from "./PrimaryButton";

type LoginCardProps = {
  theme: Theme;
  selectedRole: LoginRole;
  onSelectRole: (role: LoginRole) => void;
  description: string;
  username: string;
  password: string;
  onUsernameChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onUsernameBlur: () => void;
  onPasswordBlur: () => void;
  usernameValidationMessage?: string;
  passwordValidationMessage?: string;
  onSubmit: React.ComponentProps<"form">["onSubmit"];
  buttonLabel: string;
  usernamePlaceholder: string;
  passwordPlaceholder: string;
  isButtonDisabled: boolean;
};

export default function LoginCard({
  theme,
  selectedRole,
  onSelectRole,
  description,
  username,
  password,
  onUsernameChange,
  onPasswordChange,
  onUsernameBlur,
  onPasswordBlur,
  usernameValidationMessage,
  passwordValidationMessage,
  onSubmit,
  buttonLabel,
  usernamePlaceholder,
  passwordPlaceholder,
  isButtonDisabled,
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

        <p className={descriptionClassName}>{description}</p>

        <form className="space-y-4" onSubmit={onSubmit}>
          <TextInput
            id="username"
            label="Username"
            placeholder={usernamePlaceholder}
            theme={theme}
            value={username}
            onChange={onUsernameChange}
            onBlur={onUsernameBlur}
            validationMessage={usernameValidationMessage}
          />

          <TextInput
            id="password"
            label="Password"
            type="password"
            placeholder={passwordPlaceholder}
            theme={theme}
            value={password}
            onChange={onPasswordChange}
            onBlur={onPasswordBlur}
            validationMessage={passwordValidationMessage}
          />

          <PrimaryButton theme={theme} disabled={isButtonDisabled}>
            {buttonLabel}
          </PrimaryButton>
        </form>
      </div>
    </section>
  );
}
