import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ForgotPasswordData } from "../schemas/auth.schema";
import { forgotPasswordSchema } from "../schemas/auth.schema";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import AlertMessage from "../shared/components/AlertMessage";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const loginUser = useAuthStore((s) => s.loginUser);
  const forgotPasswordUser = useAuthStore(
    (s) => s.forgotPasswordUser
  );
  const formMessage = useAuthStore((s) => s.formMessage);
  const setFormMessage = useAuthStore((s) => s.setFormMessage);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange",
    defaultValues: { username: "", panNumber: "" },
    // criteriaMode: "all",
    // defaultValues: {
    //   username: '',
    //   password: ''
    // }
  });

  const onSubmit = async (data: ForgotPasswordData) => {
    try {
      await forgotPasswordUser(data);
      navigate("/login"); //actual direction to otp then change password
    } catch {}
  };

  return (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <div className="space-y-2">
              <label className="text-[12px] font-medium text-[#555555]">
                Client ID
              </label>
              <input
                {...register("username")}
                onChange={() => {
                  setFormMessage("");
                }}
                placeholder="Enter user ID"
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
                PAN
              </label>
              <div className="relative">
                <input
                  type="text"
                  {...register("panNumber")}
                  onChange={() => {
                    setFormMessage("");
                  }}
                  placeholder="Enter password / MPIN"
                  className="w-full rounded-lg border border-gray-200 mt-[4px] p-4 outline-none focus:ring-2 focus:ring-blue-500/20 text-[14px]"
                />
              </div>
            </div>

            {errors.panNumber?.message && (
              <p className="text-red-500 text-sm text-center">
                {errors.panNumber.message}
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
              {isSubmitting ? "Proceeding..." : "Proceed"}
            </button>
          </form>
  );
};

export default ForgotPasswordPage;