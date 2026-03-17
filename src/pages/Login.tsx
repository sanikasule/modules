import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { LoginFormData } from "../schemas/auth.schema";
import { loginSchema } from "../schemas/auth.schema";
import { useNavigate } from "react-router-dom";
import { EyeClosed, QrCode } from "lucide-react";
import { useAuthStore } from "../store/auth.store";
import AuthLeftPanel from "../shared/components/AuthLeftLayout";
import ErrorAlert from "../shared/components/ErrorAlert";

const LoginPage = () => {
  const navigate = useNavigate();

  const loginUser = useAuthStore((s) => s.loginUser);
  const forgotPasswordUser = useAuthStore(
    (s) => s.forgotPasswordUser
  );
  const formError = useAuthStore((s) => s.formError);
  const setFormError = useAuthStore((s) => s.setFormError);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    criteriaMode: "all",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await loginUser(data);
      navigate("/otp", {
        state: { username: data.username },
      });
    } catch {}
  };

  const handleForgotPassword = async () => {
    await forgotPasswordUser("AMITH1234A", "AMITH1");
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
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <div className="space-y-2">
              <label className="text-[12px] font-medium text-[#555555]">
                Mobile no. / Email /Client ID
              </label>
              <input
                {...register("username")}
                onChange={() => setFormError("")}
                placeholder="Enter Mobile no. / Email"
                className="w-full rounded-lg border border-gray-200 mt-[4px] p-4 outline-none focus:ring-2 focus:ring-blue-500/20 text-[14px]"
              />
            </div>

            {errors.username?.message && (
              <p className="text-red-500 text-sm text-center">
                {errors.username.message}
              </p>
            )}

            <div className="space-y-2">
              <label className="text-[12px] font-medium text-[#555555]">
                Password / MPIN
              </label>
              <div className="relative">
                <input
                  type="password"
                  {...register("password")}
                  onChange={() => setFormError("")}
                  placeholder="Enter password / MPIN"
                  className="w-full rounded-lg border border-gray-200 mt-[4px] p-4 outline-none focus:ring-2 focus:ring-blue-500/20 text-[14px]"
                />
                <EyeClosed className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 cursor-pointer" />
              </div>
            </div>

            {errors.password?.message && (
              <p className="text-red-500 text-sm text-center">
                {errors.password.message}
              </p>
            )}

            <div className="flex justify-center py-2">
              <button
                type="button"
                className="flex items-center gap-2 font-semibold text-[12px] text-[#0F62FE]"
              >
                <QrCode size={18} /> Login with QR code
              </button>
            </div>

            <ErrorAlert message={formError} />

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full rounded-lg p-4 font-semibold text-[16px] transition-colors ${
                isValid
                  ? "bg-[#0F62FE] text-white shadow-lg cursor-pointer"
                  : "bg-[#EAECEF] text-[#9EA3AE] cursor-not-allowed"
              }`}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>

            <div className="flex justify-between pt-2 text-sm">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="font-semibold text-[12px] text-[#0F62FE]"
              >
                Forgot user ID or password?
              </button>
              <button
                type="button"
                className="font-semibold text-[12px] text-[#0F62FE]"
              >
                Guest login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;