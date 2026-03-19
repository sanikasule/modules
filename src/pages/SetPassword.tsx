import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ChangePasswordData } from "../schemas/auth.schema";
import { changePasswordSchema } from "../schemas/auth.schema";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import AuthLeftPanel from "../shared/components/AuthLeftLayout";
import AlertMessage from "../shared/components/AlertMessage";
import PasswordField from "../shared/components/PasswordField";

const SetPasswordPage = () => {
  const navigate = useNavigate();

  const loginUser = useAuthStore((s) => s.loginUser);
  const formMessage = useAuthStore((s) => s.formMessage);
  const setFormMessage = useAuthStore((s) => s.setFormMessage);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ChangePasswordData>({
    resolver: zodResolver(changePasswordSchema),
    mode: "onChange",
    defaultValues: { oldPassword: "", newPassword: "" },
    // criteriaMode: "all",
    // defaultValues: {
    //   username: '',
    //   password: ''
    // }
  });

  const onSubmit = async (data: ChangePasswordData) => {
    try {
      navigate("/login");
    } catch {}
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
              Set password!
            </h2>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <div className="space-y-2">
              <label className="text-[12px] font-medium text-[#555555]">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  {...register("oldPassword")}
                  onChange={() => {
                    setFormMessage("");
                  }}
                  placeholder="Enter password / MPIN"
                  className="w-full rounded-lg border border-gray-200 mt-[4px] p-4 outline-none focus:ring-2 focus:ring-blue-500/20 text-[14px]"
                />
                <EyeClosed className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 cursor-pointer" />
              </div>
            </div>

            {errors.oldPassword?.message && (
              <p className="text-red-500 text-sm text-center">
                {errors.oldPassword.message}
              </p>
            )}

            <div className="space-y-2">
              <label className="text-[12px] font-medium text-[#555555]">
                Re-enter Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  {...register("newPassword")}
                  onChange={() => {
                    setFormMessage("");
                  }}
                  placeholder="Enter password / MPIN"
                  className="w-full rounded-lg border border-gray-200 mt-[4px] p-4 outline-none focus:ring-2 focus:ring-blue-500/20 text-[14px]"
                />
                <EyeClosed className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 cursor-pointer" />
              </div>
            </div>

            {errors.newPassword?.message && (
              <p className="text-red-500 text-sm text-center">
                {errors.newPassword.message}
              </p>
            )}

            {formMessage && <AlertMessage message={formMessage} />}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full rounded-lg p-4 font-semibold text-[16px] transition-colors ${
                isValid
                  ? "bg-[#0F62FE] text-white shadow-lg cursor-pointer"
                  : "bg-[#EAECEF] text-[#9EA3AE] cursor-not-allowed"
              }`}
            >
              {isSubmitting ? "Setting password..." : "Set Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SetPasswordPage;