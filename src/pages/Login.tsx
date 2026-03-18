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
    defaultValues: { username: "" as any, password: "" as any },
    // criteriaMode: "all",
    // defaultValues: {
    //   username: '',
    //   password: ''
    // }
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
    // await forgotPasswordUser("AMITH1234A", "AMITH1");
    navigate("/forgot")
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

            <Button type="submit" isValid={isValid} isSubmitting={isSubmitting} label1="Logging in..." label2="Login" />

            <div className="flex justify-between pt-2 text-sm">
              <button
                type="button"
                onClick={handleForgotPassword}
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