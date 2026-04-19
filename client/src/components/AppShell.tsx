import type { ReactNode } from "react";
import type { Theme } from "../lib/theme";

type AppShellProps = {
  children: ReactNode;
  theme: Theme;
};

export default function AppShell({ children, theme }: AppShellProps) {
  return (
    <main
      className={
        theme === "dark"
          ? "min-h-screen bg-slate-950 text-slate-100"
          : "min-h-screen bg-white text-slate-900"
      }
    >
      <div className="mx-auto max-w-7xl px-6 py-10">{children}</div>
    </main>
  );
}
