import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { LoginFormData } from "../schemas/auth.schema";
import { loginSchema } from "../schemas/auth.schema";
import { useNavigate } from "react-router-dom";
import { QrCode } from "lucide-react";
import { useAuthStore } from "../store/auth.store";
import AuthLeftPanel from "../shared/components/AuthLeftLayout";
import AlertMessage from "../shared/components/AlertMessage";
import Button from "../shared/components/Button";
import InputField from "../shared/components/InputField";
import PasswordField from "../shared/components/PasswordField";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isBlocked, setIsBlocked] = useState(false); // Track block status
  const [currentUsername, setCurrentUsername] = useState("");

  const loginUser = useAuthStore((s) => s.loginUser);
  // const forgotPasswordUser = useAuthStore(
  //   (s) => s.forgotPasswordUser
  // );
  const formMessage = useAuthStore((s) => s.formMessage);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: { username: "", password: "" },
    // criteriaMode: "all",
    // defaultValues: {
    //   username: '',
    //   password: ''
    // }
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsBlocked(false);
      await loginUser(data);
      // Case 1: Normal Login Success -> Go to regular OTP
      navigate("/otp", {
        state: { username: data.username, type: "login" },
      });
    } catch (error: any) {
      // Case 2: User is blocked
      if (error?.response?.status === 423) {
        setIsBlocked(true);
        setCurrentUsername(data.username);
      }
    }
  };

  const handleUnblockRedirect = () => {
    // Case 2: User clicks Unblock -> Go to same OTP page but with 'unlock' type
    navigate("/otp", {
      state: { 
        username: currentUsername, 
        type: "unlock" 
      },
    });
  };

  const handleForgot = async () => {
    // await forgotPasswordUser("AMITH1234A", "AMITH1");
    navigate("/forgot/forgotpassword")
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
            <InputField 
              label="Mobile No. / Email / Client ID" registration={register("username")}
              placeholder="Enter Mobile No. / Email / Client ID" 
              error={errors.username?.message}
            />

            <PasswordField label="Password" 
            registration={register("password")}
            placeholder="Enter Password"
            error={errors.password?.message} />

            <div className="flex justify-center py-2">
              <button
                type="button"
                className="flex items-center gap-2 font-semibold text-[12px] text-[#0F62FE]"
              >
                <QrCode size={18} /> Login with QR code
              </button>
            </div>

            {formMessage && <AlertMessage message={formMessage} />}

            {isBlocked ? (
              <button
                  type="button"
                  onClick={handleUnblockRedirect}
                  className="w-full py-3 bg-[#0F62FE] text-white font-semibold rounded-md transition-colors cursor-pointer"
                >
                  Unblock User
                </button>
            ) : (
              <Button 
                type="submit" 
                isValid={isValid} 
                isSubmitting={isSubmitting} 
                label1="Logging in..." 
                label2="Login" 
              />
            )}

            <div className="flex justify-between pt-2 text-sm">
              <button
                type="button"
                onClick={handleForgot}
                className="font-semibold text-[12px] text-[#0F62FE] cursor-pointer"
              >
                Forgot user ID or password?
              </button>
              <button
                type="button"
                className="font-semibold text-[12px] text-[#0F62FE] cursor-pointer"
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