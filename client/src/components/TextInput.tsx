import type { Theme } from "../lib/theme";

type TextInputProps = {
  id: string;
  label: string;
  type?: "text" | "password";
  placeholder?: string;
  theme: Theme;
};

export default function TextInput({
  id,
  label,
  type = "text",
  placeholder,
  theme,
}: TextInputProps) {
  const labelClassName =
    theme === "dark"
      ? "block text-sm font-medium text-slate-300"
      : "block text-sm font-medium text-slate-700";

  const inputClassName =
    theme === "dark"
      ? "w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-400 focus:border-slate-500"
      : "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-500";

  return (
    <div className="space-y-2">
      <label htmlFor={id} className={labelClassName}>
        {label}
      </label>

      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        className={inputClassName}
      />
    </div>
  );
}
