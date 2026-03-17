import { TriangleAlert } from "lucide-react";

export default function ErrorAlert({
  message,
}: {
  message: string;
}) {
  if (!message) return null;

  return (
    <div className="h-1/4 p-2">
      <div className="flex bg-red-100 border-solid border-red-500 rounded-l p-2 space-x-2 place-content-center">
        <TriangleAlert
          color="oklch(63.7% 0.237 25.331)"
          className="w-5 h-5"
        />
        <span className="text-sm text-red-500">{message}</span>
      </div>
    </div>
  );
}