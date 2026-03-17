import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { LoginFormData, ForgotPasswordData } from "../schemas/auth.schema";
import { loginSchema, forgotPasswordSchema } from "../schemas/auth.schema";
import { forgotPassword, login } from "../api/auth.api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// Import icons if you are using a library like lucide-react, otherwise use your SVGs
import { EyeClosed, QrCode, TriangleAlert } from "lucide-react"; 

const LoginPage = () => {
  const navigate = useNavigate();
  const [formError, setFormError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginFormData) => {
    setFormError("");
    try {
      await login(data);
      navigate("/otp", { state: { username: data.username } });
    } catch (err: any) {
      setFormError("Invalid username or password");
    }
  };

  const handleForgotPassword = async (panNumber: string, username: string) => {
    try {
      const response = await forgotPassword(panNumber, username);
      console.log(response.message);
    } catch (err: any) {
      console.error("failed to fetch data", err);
    }
  }

  return (
    <div className="flex h-screen w-full bg-white font-sans">
      {/* LEFT SIDE: Branding Card */}
      <div className="hidden lg:flex w-1/2 p-[24px]">
        <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-[24px] bg-[#0F62FE] text-white">
          <div className="z-10 text-center">
            <h1 className="text-[32px] font-normal">
              Take Charge <br /> of Your <span className="text-[32px] font-bold">Investments with Us</span>
            </h1>
            <p className="mt-4 text-sm text-white font-normal">"Dummy message"</p>
          </div>

          <div className="mt-12">
            <img src="../src/assets/Group.svg" alt="Illustration" className="w-64" />
          </div>

          {/* Pagination Dots */}
          <div className="absolute bottom-10 flex gap-2">
            <div className="h-1.5 w-6 rounded-full bg-gray-400"></div>
            <div className="h-1.5 w-1.5 rounded-full bg-white"></div>
            <div className="h-1.5 w-1.5 rounded-full bg-white"></div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Login Form */}
      <div className="flex w-full flex-col items-center justify-center p-[24px] lg:w-1/2">
        <div className="w-full max-w-md">
          {/* Logo and Welcome */}
          <div className="mb-6 flex flex-col items-start">
            <img src="../src/assets/Vector.svg" alt="Logo" className="mb-2 w-10" />
            <h2 className="text-xl font-semibold text[#2A2A2B]">
              Welcome to Nest app
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Input: Username */}
            <div className="space-y-2">
              <label className="text-[12px] font-medium text-[#555555]">Mobile no. / Email /Client ID</label>
              <input
                {...register("username")}
                placeholder="Enter Mobile no. / Email"
                onChange={() => setFormError("")}
                className="w-full rounded-lg border border-gray-200 mt-[4px] p-4 outline-none focus:ring-2 focus:ring-blue-500/20 text-[14px]"
              />
            
            </div>
            {errors.username?.message && 
              <p className="text-red-500 text-sm text-center">{errors.username.message}</p>
            }

            {/* Input: Password */}
            <div className="space-y-2">
              <label className="text-[12px] font-medium text-[#555555]">Password / MPIN</label>
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
            {errors.password?.message && 
              <p className="text-red-500 text-sm text-center">{errors.password.message}</p>
            }

            {/* QR Login Link */}
            <div className="flex justify-center py-2">
              <button type="button" className="flex items-center gap-2 font-semibold text-[12px] text-[#0F62FE]">
                <QrCode size={18} /> Login with QR code
              </button>
            </div>

            {formError && 
              <div className="h-1/4 p-2">
                  <div className="flex bg-red-100 border-solid border-red-500 rounded-l p-2 space-x-2 place-content-center">
                    <TriangleAlert color="oklch(63.7% 0.237 25.331)" className="w-5 h-5" />
                    <span className="text-sm text-red-500">{formError}</span>
                  </div>
              </div>
            }

            {/* Submit Button */}
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

            {/* Footer Links */}
            <div className="flex justify-between pt-2 text-sm">
              <button type="button" className="font-semibold text-[12px] text-[#0F62FE]" onClick={() => handleForgotPassword}>Forgot user ID or password?</button>
              <button type="button" className="font-semibold text-[12px] text-[#0F62FE]">Guest login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  console.log("Form Status:", { isValid, errors });
};

export default LoginPage;