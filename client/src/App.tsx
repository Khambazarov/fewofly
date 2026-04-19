import AppShell from "./components/AppShell";
import ThemeToggleButton from "./components/ThemeToggleButton";
import { useTheme } from "./hooks/useTheme";

export default function App() {
  const { theme, setTheme } = useTheme();

  function handleToggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <AppShell theme={theme}>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">FewoFly Internal Tool</h1>
        <ThemeToggleButton theme={theme} onToggle={handleToggleTheme} />
      </div>
    </AppShell>
  );
}
