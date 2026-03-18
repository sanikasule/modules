import React from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { useAuthStore } from "../../store/auth.store";

interface InputFieldProps {
    label: string;
    registration: UseFormRegisterReturn,
    placeholder: string;
    error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    registration,
    placeholder,
    error
}) => {
    const setFormMessage = useAuthStore((s) => s.setFormMessage)
    return (
        <div className="space-y-2">
            <label className="text-[12px] font-medium text-[#555555]">
                {label}
            </label>
            <input {...registration} onChange={() => setFormMessage("")} placeholder={placeholder}
            className="w-full rounded-lg border border-gray-200 mt-[4px] p-4 outline-none focus:ring-2 focus:ring-blue-500/20 text-[14px]"
            />
            {error && (
              <p className="text-red-500 text-sm text-center">
                {error}
              </p>
            )}
        </div>
    )
}

export default InputField;