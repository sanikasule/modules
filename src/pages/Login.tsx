import { useState } from "react";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { login } from "../api/auth.api";

//step 1:- define schema(parameters) for logging in
const schema = z.object({
    username: z.string(),
    password: z.string().regex(/^[A-Za-z0-9]+$/).min(8)
})

export default function Login() {
    //initial states in ui
    const [username, setUserame] = useState("");
    const [password, setPassword] = useState("");

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        resolver: zodResolver(schema),
    });

    return (
        <h1>
            Login
        </h1>
    )
}

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "../schemas/auth.schema";
import { loginUser } from "../api/auth.api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LoginPage = () => {
  const navigate = useNavigate();

  const [formError, setFormError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setFormError("");

    try {
      const result = await loginUser(data);

      localStorage.setItem("sessionId", result.sessionId);

      navigate("/otp");
    } catch (err: any) {
      // API error
      setFormError("Invalid username or password");
    }
  };

  /**
   * Called when ZOD validation fails
   */
  const onInvalid = () => {
    setFormError("Invalid username or password");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      className="max-w-sm mx-auto mt-20 space-y-4"
    >
      <h2 className="text-xl font-semibold">Login</h2>

      {/* Username */}
      <input
        {...register("username")}
        placeholder="Username"
        className="border p-2 w-full"
      />

      {/* Password */}
      <input
        type="password"
        {...register("password")}
        placeholder="Password"
        className="border p-2 w-full"
      />

      {/* Common Error Message */}
      {formError && (
        <p className="text-red-600 text-sm text-center">
          {formError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 text-white p-2 w-full"
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default LoginPage;
