type FormMessageProps = {
  message: string;
};

export default function FormMessage({ message }: FormMessageProps) {
  return <p className="text-sm text-rose-500">{message}</p>;
}
