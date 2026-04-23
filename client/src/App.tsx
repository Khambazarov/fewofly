import { useEffect, useState } from "react";
import AppShell from "./components/AppShell";
import LoggedInCard from "./components/LoggedInCard";
import LoginCard from "./components/LoginCard";
import ThemeToggleButton from "./components/ThemeToggleButton";
import { useCurrentUser } from "./hooks/useCurrentUser";
import { useLoginForm } from "./hooks/useLoginForm";
import { useLoginRequest } from "./hooks/useLoginRequest";
import { useLogout } from "./hooks/useLogout";
import { useProtectedDashboard } from "./hooks/useProtectedDashboard";
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
  PASSWORD_VALIDATION_MESSAGE,
  USERNAME_VALIDATION_MESSAGE,
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
  const { isLoading, errorMessage, submitLogin } = useLoginRequest();
  const { isLoggingOut, submitLogout } = useLogout();
  const { currentUser, setCurrentUser, loadCurrentUser } = useCurrentUser();
  const { dashboardData, loadProtectedDashboard } = useProtectedDashboard();

  useEffect(() => {
    async function initializeUserSession() {
      const user = await loadCurrentUser();

      if (user) {
        await loadProtectedDashboard();
      }
    }

    void initializeUserSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleToggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  async function handleSubmit(
    event: Parameters<NonNullable<React.ComponentProps<"form">["onSubmit"]>>[0],
  ) {
    event.preventDefault();

    setUsernameTouched(true);
    setPasswordTouched(true);

    if (!isLoginFormValid(username, password)) {
      return;
    }

    const user = await submitLogin(username, password);

    if (user) {
      await loadCurrentUser();
      await loadProtectedDashboard();
    }
  }

  async function handleLogout() {
    const success = await submitLogout();

    if (success) {
      setCurrentUser(null);
      window.location.reload();
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

      {currentUser ? (
        <LoggedInCard
          theme={theme}
          currentUser={currentUser}
          onLogout={handleLogout}
          isLoggingOut={isLoggingOut}
          protectedMessage={dashboardData?.message}
        />
      ) : (
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
          requestErrorMessage={errorMessage}
          onSubmit={handleSubmit}
          buttonLabel={getLoginButtonLabel(selectedRole)}
          usernamePlaceholder={getUsernamePlaceholder(selectedRole)}
          passwordPlaceholder={getPasswordPlaceholder(selectedRole)}
          isButtonDisabled={isLoginButtonDisabled(username, password)}
          isLoading={isLoading}
        />
      )}
    </AppShell>
  );
}
