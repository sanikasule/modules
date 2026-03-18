import React from "react";
import { TriangleAlert, CircleCheck } from "lucide-react";
import { useAuthStore } from "../../store/auth.store";

interface AlertMessageProps {
  message: string;
}

const AlertMessage: React.FC<AlertMessageProps> = ({ message }) => {
  const isSuccess = useAuthStore((s) => s.isSuccess);

  if (!message) return null;

  const config = isSuccess
    ? {
        container: "bg-green-100 border-green-500",
        text: "text-green-600",
        Icon: CircleCheck,
        iconColor: "oklch(72.3% 0.219 149.579)", 
      }
    : {
        container: "bg-red-100 border-red-500",
        text: "text-red-600",
        Icon: TriangleAlert,
        iconColor: "oklch(63.7% 0.237 25.331)",
      };

  const { Icon, container, text, iconColor } = config;

  return (
    <div className="w-full p-2 transition-all duration-300">
      <div
        className={`flex items-center justify-center border-l-4 rounded-r-lg p-3 space-x-3 ${container}`}
      >
        <Icon className="w-5 h-5 flex-shrink-0" color={iconColor} />
        <span className={`text-sm font-medium ${text}`}>{message}</span>
      </div>
    </div>
  );
};

export default AlertMessage;