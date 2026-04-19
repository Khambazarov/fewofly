import { useState } from "react";
import AppShell from "./components/AppShell";
import LoginCard from "./components/LoginCard";
import ThemeToggleButton from "./components/ThemeToggleButton";
import { useTheme } from "./hooks/useTheme";
import type { LoginRole } from "./lib/auth";

export default function App() {
  const { theme, setTheme } = useTheme();
  const [selectedRole, setSelectedRole] = useState<LoginRole>("employee");

  function handleToggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
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
      />
    </AppShell>
  );
}
