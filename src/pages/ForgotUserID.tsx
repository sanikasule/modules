import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ForgotUserIDData } from "../schemas/auth.schema";
import { forgotUserIDSchema } from "../schemas/auth.schema";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import AlertMessage from "../shared/components/AlertMessage";
import InputField from "../shared/components/InputField";
import Button from "../shared/components/Button";

const ForgotUserIDPage = () => {
  const navigate = useNavigate();

  const loginUser = useAuthStore((s) => s.loginUser);
  const forgotUserID = useAuthStore(
    (s) => s.forgotUserID
  );
  const formMessage = useAuthStore((s) => s.formMessage);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ForgotUserIDData>({
    resolver: zodResolver(forgotUserIDSchema),
    mode: "onChange",
    defaultValues: { panNumber: "", emailId: "" },
    // criteriaMode: "all",
    // defaultValues: {
    //   username: '',
    //   password: ''
    // }
  });

  const onSubmit = async (data: ForgotUserIDData) => {
    try {
      await forgotUserID(data);
      navigate("/login"); //actually navigate to otp
    } catch {}
  };

  return (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <InputField 
              label="Mobile / Email" registration={register("emailId")}
              placeholder="Enter email ID" 
              error={errors.emailId?.message}
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

export default ForgotUserIDPage;