import { z } from "zod";

export const loginSchema = z.object({
    username: z.string().min(1, {message: "Username required"}),
    password: z.string().min(1, {message: "Password required"})
});

export const validateOTPSchema = z.object({
    username: z.string(),
    otp: z.number().min(1, {message: "OTP required"})
})

export const forgotUserIDSchema = z.object({
    panNumber: z.string().min(1, {message: "PAN number required"}),
    emailId: z.string().min(1, {message: "Email required"}),
})

export const forgotPasswordSchema = z.object({
    panNumber: z.string().min(1, {message: "PAN number required"}),
    username: z.string().min(1, {message: "Username required"}),
})

export const changePasswordSchema = z.object({
    oldPassword: z.string().min(1, {message: "PAN number required"}),
    newPassword: z.string().min(1, {message: "PAN number required"})
})

export type LoginFormData = z.infer<typeof loginSchema>;
export type ValidateOtpData = z.infer<typeof validateOTPSchema>;
export type ForgotUserIDData = z.infer<typeof forgotUserIDSchema>
export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;
export type ChangePasswordData = z.infer<typeof changePasswordSchema>