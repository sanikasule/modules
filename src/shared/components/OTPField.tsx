import React from "react";
import type {RefObject} from "react";
import { useAuthStore } from "../../store/auth.store";

interface OTPFieldProps {
  error?: string;
  inputRefs: RefObject<(HTMLInputElement | null)[]>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
}

const OTPField: React.FC<OTPFieldProps> = ({ error, inputRefs, onChange }) => {
  const formMessage = useAuthStore((s) => s.formMessage);

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex justify-between gap-2">
        {[...Array(4)].map((_, index) => (
          <input
            key={index}
            type="text"
            inputMode="numeric"
            maxLength={1}
            ref={(el) => (inputRefs.current[index] = el)}
            onChange={(e) => onChange(e, index)}
            onKeyDown={(e) => {
              // Handle backspace to move focus backward
              if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
                inputRefs.current[index - 1]?.focus();
              }
            }}
            className={`w-14 h-14 text-center text-xl font-bold border rounded-lg outline-none focus:ring-2 focus:ring-[#0F62FE] transition-all ${
              error || formMessage ? "border-red-500 focus:ring-red-500/20" : "border-gray-300"
            }`}
          />
        ))}
      </div>
      {error && (
        <p className="text-red-500 text-sm text-center">
          {error}
        </p>
      )}
    </div>
  );
};

export default OTPField;