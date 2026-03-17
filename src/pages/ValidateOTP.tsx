import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ValidateOtpData } from "../schemas/auth.schema";
import { validateOTPSchema } from "../schemas/auth.schema";
import { useNavigate, useLocation } from "react-router-dom";
import { useRef } from "react";
import AuthLeftPanel from "../shared/components/AuthLeftLayout";
import ErrorAlert from "../shared/components/ErrorAlert";
import { useAuthStore } from "../store/auth.store";

export default function ValidateOTP() {
  const navigate = useNavigate();
  const location = useLocation();

  const verifyOtp = useAuthStore((s) => s.verifyOtp);
  const formError = useAuthStore((s) => s.formError);
  const setFormError = useAuthStore((s) => s.setFormError);

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
      localStorage.setItem(
        "accessToken",
        res.jwtTokens.accessToken
      );
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

    setFormError("");
  };

  return (
    <div className="flex h-screen w-full bg-white font-sans">
      <AuthLeftPanel />

      <div className="flex w-full flex-col items-center justify-center p-[24px] lg:w-1/2">
        <div className="w-full max-w-md">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div className="flex justify-between">
              {[...Array(4)].map((_, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  maxLength={1}
                  className="w-15 h-15 text-center text-xl font-bold border rounded-lg"
                  onChange={(e) =>
                    handleOtpChange(e, index)
                  }
                />
              ))}
            </div>

            {errors.otp?.message && (
              <p className="text-red-500 text-sm text-center">
                {errors.otp.message}
              </p>
            )}

            <ErrorAlert message={formError} />

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full rounded-lg p-4 font-semibold text-[16px] ${
                isValid
                  ? "bg-[#0F62FE] text-white"
                  : "bg-[#EAECEF] text-[#9EA3AE]"
              }`}
            >
              {isSubmitting ? "Verifying..." : "Verify"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}