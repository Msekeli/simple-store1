import { useToastStore } from "../store/toast";

export default function Toast() {
  const { message, type } = useToastStore();

  if (!message) return null;

  const bg =
    type === "error"
      ? "bg-red-600"
      : type === "info"
      ? "bg-blue-600"
      : "bg-green-600";

  return (
    <div
      className={`${bg} fixed top-4 right-4 text-white px-4 py-2 rounded shadow-lg animate-fade-in-out z-50`}
    >
      {message}
    </div>
  );
}
