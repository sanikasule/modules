import { z } from "zod";

export const loginSchema = z.object({
    username: z.string().min(1, {message: "Username required"}),
    password: z.string().min(1, {message: "Password required"})
});

export const validateOTPSchema = z.object({
    username: z.string(),
    otp: z.coerce.number().min(1, {message: "OTP required"})
})

export const forgotPasswordSchema = z.object({
    panNumber: z.string(),
    username: z.string(),
})

export type LoginFormData = z.infer<typeof loginSchema>;
export type ValidateOtpData = z.infer<typeof validateOTPSchema>;
export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;