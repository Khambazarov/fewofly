type ThemeToggleButtonProps = {
  theme: "light" | "dark";
  onToggle: () => void;
};

export default function ThemeToggleButton({
  theme,
  onToggle,
}: ThemeToggleButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium"
    >
      {theme === "light" ? "Dark Mode" : "Light Mode"}
    </button>
  );
}
