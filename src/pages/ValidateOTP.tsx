import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ValidateOtpData } from "../schemas/auth.schema";
import { validateOTPSchema } from "../schemas/auth.schema";
import { useNavigate, useLocation } from "react-router-dom";
import { useRef } from "react";
import AuthLeftPanel from "../shared/components/AuthLeftLayout";
import AlertMessage from "../shared/components/AlertMessage";
import { useAuthStore } from "../store/auth.store";
import Button from "../shared/components/Button";
import OTPField from "../shared/components/OTPField";


export default function ValidateOTP() {
  const navigate = useNavigate();
  const location = useLocation();

  const verifyOtp = useAuthStore((s) => s.verifyOtp);
  const formMessage = useAuthStore((s) => s.formMessage);
  const setFormMessage = useAuthStore((s) => s.setFormMessage);

  const username = location.state?.username;

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const {
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ValidateOtpData>({
    resolver: zodResolver(validateOTPSchema),
    mode: "onChange",
    defaultValues: { username, otp: "" as any },
  });

  const onSubmit = async (data: ValidateOtpData) => {
    try {
      const res = await verifyOtp(data);
      navigate("/dashboard");
    } catch {}
  };

  const handleOtpChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const val = e.target.value;
    if (isNaN(Number(val))) return;

    if (val.length === 1 && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    const currentOtp = inputRefs.current
      .map((i) => i?.value || "")
      .join("");

    setValue("otp", Number(currentOtp), {
      shouldValidate: true,
    });

    setFormMessage("");
  };

  return (
    <div className="flex h-screen w-full bg-white font-sans">
      <AuthLeftPanel />

      <div className="flex w-full flex-col items-center justify-center p-[24px] lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-6 flex flex-col items-start">
            <img
              src="../src/assets/Vector.svg"
              alt="Logo"
              className="mb-2 w-10"
            />
            <h2 className="text-xl font-semibold text[#2A2A2B]">
              Welcome to Nest app
            </h2>

            <h2 className="mt-12 text-[16px] font-semibold text[#2A2A2B]">
              Enter OTP
            </h2>
            {username && 
            <p className="mt-2 text-sm text-gray-500">OTP sent to <span className="font-semibold text-gray-700">{username}</span></p>}           
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <OTPField 
              inputRefs={inputRefs} 
              onChange={handleOtpChange} 
              error={errors.otp?.message}
            />

            {formMessage && <AlertMessage message={formMessage} />}

            <Button type="submit" isValid={isValid} isSubmitting={isSubmitting} label1="Verifying..." label2="Verify" />
          </form>
        </div>
      </div>
    </div>
  );
}