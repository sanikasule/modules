import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SetPasswordData } from "../schemas/auth.schema";
import { setPasswordSchema } from "../schemas/auth.schema";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import AuthLeftPanel from "../shared/components/AuthLeftLayout";
import AlertMessage from "../shared/components/AlertMessage";
import InputField from "../shared/components/InputField";
import PasswordField from "../shared/components/PasswordField";
import Button from "../shared/components/Button";

const SetPasswordPage = () => {
  const navigate = useNavigate();

  const loginUser = useAuthStore((s) => s.loginUser);
  const formMessage = useAuthStore((s) => s.formMessage);
  const setFormMessage = useAuthStore((s) => s.setFormMessage);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SetPasswordData>({
    resolver: zodResolver(setPasswordSchema),
    mode: "onChange",
    defaultValues: { username: "", password: "", confirmPassword: "" },
    // criteriaMode: "all",
    // defaultValues: {
    //   username: '',
    //   password: ''
    // }
  });

  const onSubmit = async (data: SetPasswordData) => {
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
            <InputField 
              label="Mobile No. / Email / Client ID" registration={register("username")}
              placeholder="Enter Mobile No. / Email / Client ID" 
              error={errors.username?.message}
            />

            <PasswordField label="Password" 
            registration={register("password")}
            placeholder="Enter Password"
            error={errors.password?.message} />

            <PasswordField label="Re-enter Password" 
            registration={register("confirmPassword")}
            placeholder="Enter Password"
            error={errors.confirmPassword?.message} />

            {formMessage && <AlertMessage message={formMessage} />}

            <Button type="submit" isValid={isValid} isSubmitting={isSubmitting} label1="Setting Password..." label2="Set Password" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SetPasswordPage;