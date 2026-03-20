import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ForgotPasswordData } from "../schemas/auth.schema";
import { forgotPasswordSchema } from "../schemas/auth.schema";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import AlertMessage from "../shared/components/AlertMessage";
import InputField from "../shared/components/InputField";
import Button from "../shared/components/Button";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const loginUser = useAuthStore((s) => s.loginUser);
  const forgotPasswordUser = useAuthStore(
    (s) => s.forgotPasswordUser
  );
  const formMessage = useAuthStore((s) => s.formMessage);

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
      navigate("/setpassword"); //actual direction to otp then change password
    } catch {}
  };

  return (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <InputField 
              label="Client ID" registration={register("username")}
              placeholder="Enter Client ID" 
              error={errors.username?.message}
            />

            <InputField 
              label="PAN" registration={register("panNumber")}
              placeholder="Enter PAN number" 
              error={errors.panNumber?.message}
            />

            {formMessage && <AlertMessage message={formMessage} />}

            <Button type="submit" isValid={isValid} isSubmitting={isSubmitting} label1="Proceeding..." label2="Proceed" />
          </form>
  );
};

export default ForgotPasswordPage;