import type { Theme } from "../lib/theme";
import TextInput from "./TextInput";
import PrimaryButton from "./PrimaryButton";

type LoginCardProps = {
  theme: Theme;
  description: string;
  username: string;
  password: string;
  onUsernameChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onUsernameBlur: () => void;
  onPasswordBlur: () => void;
  usernameValidationMessage?: string;
  passwordValidationMessage?: string;
  requestErrorMessage?: string;
  onSubmit: React.ComponentProps<"form">["onSubmit"];
  buttonLabel: string;
  usernamePlaceholder: string;
  passwordPlaceholder: string;
  isButtonDisabled: boolean;
  isLoading: boolean;
};

export default function LoginCard({
  theme,
  description,
  username,
  password,
  onUsernameChange,
  onPasswordChange,
  onUsernameBlur,
  onPasswordBlur,
  usernameValidationMessage,
  passwordValidationMessage,
  requestErrorMessage,
  onSubmit,
  buttonLabel,
  usernamePlaceholder,
  passwordPlaceholder,
  isButtonDisabled,
  isLoading,
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

  const errorClassName =
    theme === "dark" ? "text-sm text-rose-400" : "text-sm text-rose-600";

  return (
    <section className={cardClassName}>
      <div className="space-y-5">
        <h2 className={titleClassName}>Login</h2>

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

          {requestErrorMessage ? (
            <p className={errorClassName}>{requestErrorMessage}</p>
          ) : null}

          <PrimaryButton
            theme={theme}
            disabled={isButtonDisabled}
            isLoading={isLoading}
          >
            {buttonLabel}
          </PrimaryButton>
        </form>
      </div>
    </section>
  );
}
