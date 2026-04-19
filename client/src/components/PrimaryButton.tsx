import type { Theme } from "../lib/theme";

type PrimaryButtonProps = {
  children: React.ReactNode;
  theme: Theme;
  disabled?: boolean;
};

export default function PrimaryButton({
  children,
  theme,
  disabled = false,
}: PrimaryButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={
        theme === "dark"
          ? `w-full rounded-xl px-4 py-3 text-sm font-semibold ${
              disabled
                ? "cursor-not-allowed bg-slate-700 text-slate-400"
                : "bg-slate-100 text-slate-900 hover:bg-slate-200"
            }`
          : `w-full rounded-xl px-4 py-3 text-sm font-semibold ${
              disabled
                ? "cursor-not-allowed bg-slate-300 text-slate-500"
                : "bg-slate-900 text-white hover:opacity-90"
            }`
      }
    >
      {children}
    </button>
  );
}
