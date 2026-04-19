import { useState } from "react";
import AppShell from "./components/AppShell";
import LoginCard from "./components/LoginCard";
import ThemeToggleButton from "./components/ThemeToggleButton";
import { useLoginForm } from "./hooks/useLoginForm";
import { useTheme } from "./hooks/useTheme";
import type { LoginRole } from "./lib/auth";
import { getLoginButtonLabel } from "./lib/auth-messages";
import {
  getPasswordPlaceholder,
  getUsernamePlaceholder,
} from "./lib/auth-placeholders";
import { getLoginDescription } from "./lib/login";
import { isLoginButtonDisabled } from "./lib/login-button";
import {
  USERNAME_VALIDATION_MESSAGE,
  PASSWORD_VALIDATION_MESSAGE,
} from "./lib/messages";
import { isLoginFormValid } from "./lib/validation";

export default function App() {
  const { theme, setTheme } = useTheme();
  const [selectedRole, setSelectedRole] = useState<LoginRole>("employee");
  const {
    username,
    password,
    usernameTouched,
    passwordTouched,
    setUsername,
    setPassword,
    setUsernameTouched,
    setPasswordTouched,
  } = useLoginForm();

  function handleToggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  function handleSubmit(
    event: Parameters<NonNullable<React.ComponentProps<"form">["onSubmit"]>>[0],
  ) {
    event.preventDefault();

    setUsernameTouched(true);
    setPasswordTouched(true);

    if (!isLoginFormValid(username, password)) {
      return;
    }
  }

  const usernameValidationMessage =
    usernameTouched && username.trim().length < 3
      ? USERNAME_VALIDATION_MESSAGE
      : undefined;

  const passwordValidationMessage =
    passwordTouched && password.trim().length < 8
      ? PASSWORD_VALIDATION_MESSAGE
      : undefined;

  return (
    <AppShell theme={theme}>
      <header className="mb-12 flex flex-col gap-4 sm:relative sm:block">
        <div className="flex justify-end sm:absolute sm:right-0 sm:top-1/2 sm:-translate-y-1/2">
          <ThemeToggleButton theme={theme} onToggle={handleToggleTheme} />
        </div>

        <h1 className="text-center text-3xl font-bold">
          FewoFly Internal Tool
        </h1>
      </header>

      <LoginCard
        theme={theme}
        selectedRole={selectedRole}
        onSelectRole={setSelectedRole}
        description={getLoginDescription(selectedRole)}
        username={username}
        password={password}
        onUsernameChange={setUsername}
        onPasswordChange={setPassword}
        onUsernameBlur={() => setUsernameTouched(true)}
        onPasswordBlur={() => setPasswordTouched(true)}
        usernameValidationMessage={usernameValidationMessage}
        passwordValidationMessage={passwordValidationMessage}
        onSubmit={handleSubmit}
        buttonLabel={getLoginButtonLabel(selectedRole)}
        usernamePlaceholder={getUsernamePlaceholder(selectedRole)}
        passwordPlaceholder={getPasswordPlaceholder(selectedRole)}
        isButtonDisabled={isLoginButtonDisabled(username, password)}
      />
    </AppShell>
  );
}
