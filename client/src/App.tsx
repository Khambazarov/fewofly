import { useState } from "react";
import AppShell from "./components/AppShell";
import LoginCard from "./components/LoginCard";
import ThemeToggleButton from "./components/ThemeToggleButton";
import { useLoginForm } from "./hooks/useLoginForm";
import { useTheme } from "./hooks/useTheme";
import type { LoginRole } from "./lib/auth";
import { getLoginDescription } from "./lib/login";
import { LOGIN_VALIDATION_MESSAGE } from "./lib/messages";
import { isLoginFormValid } from "./lib/validation";

export default function App() {
  const { theme, setTheme } = useTheme();
  const [selectedRole, setSelectedRole] = useState<LoginRole>("employee");
  const [showValidationMessage, setShowValidationMessage] = useState(false);
  const { username, password, setUsername, setPassword } = useLoginForm();

  function handleToggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const isValid = isLoginFormValid(username, password);
    setShowValidationMessage(!isValid);
  }

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
        validationMessage={
          showValidationMessage ? LOGIN_VALIDATION_MESSAGE : undefined
        }
        onSubmit={handleSubmit}
      />
    </AppShell>
  );
}
