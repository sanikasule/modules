import React, { useState } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { useAuthStore } from "../../store/auth.store";
import { Eye, EyeOff } from "lucide-react";

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
    const [showPassword, setShowPassword] = useState(false);
    const setFormMessage = useAuthStore((s) => s.setFormMessage)
    return (
        <div className="space-y-2">
            <label className="text-[12px] font-medium text-[#555555]">
                {label}
            </label>
            <div className="relative">
                <input {...registration} onChange={(e) => {
                    registration.onChange(e)
                    setFormMessage("")}
                } type={showPassword ? "text" : "password"}
                placeholder={placeholder}
                className="w-full rounded-lg border border-gray-200 mt-[4px] p-4 outline-none focus:ring-2 focus:ring-blue-500/20 text-[14px]"
                />
                <button
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
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