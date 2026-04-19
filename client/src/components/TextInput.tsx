type TextInputProps = {
  id: string;
  label: string;
  type?: "text" | "password";
  placeholder?: string;
};

export default function TextInput({
  id,
  label,
  type = "text",
  placeholder,
}: TextInputProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-slate-700">
        {label}
      </label>

      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-500"
      />
    </div>
  );
}
