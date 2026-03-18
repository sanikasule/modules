import React from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { useAuthStore } from "../../store/auth.store";
import { EyeClosed } from "lucide-react";

interface PasswordFieldProps {
    label: string;
    registration: UseFormRegisterReturn,
    placeholder: string;
    error?: string;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
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
            <div className="relative">
                <input {...registration} onChange={() => setFormMessage("")} type="password" placeholder={placeholder}
                className="w-full rounded-lg border border-gray-200 mt-[4px] p-4 outline-none focus:ring-2 focus:ring-blue-500/20 text-[14px]"
                />
                <EyeClosed className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 cursor-pointer" />
                {error && (
                    <p className="text-red-500 text-sm text-center">
                        {error}
                    </p>
                )}
            </div>
        </div>
    )
}

export default PasswordField;