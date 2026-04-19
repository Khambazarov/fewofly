import type { Theme } from "../lib/theme";

type PrimaryButtonProps = {
  children: React.ReactNode;
  theme: Theme;
};

export default function PrimaryButton({ children, theme }: PrimaryButtonProps) {
  return (
    <button
      type="submit"
      className={
        theme === "dark"
          ? "w-full rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-200"
          : "w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:opacity-90"
      }
    >
      {children}
    </button>
  );
}
