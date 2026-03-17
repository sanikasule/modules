import { create } from "zustand";
import {
  login,
  validateOTP,
  forgotPassword,
  preAuthHandshake,
} from "../api/auth.api";

interface AuthState {
  formError: string;
  setFormError: (msg: string) => void;

  startHandshake: () => Promise<void>;
  loginUser: (data: {
    username: string;
    password: string;
  }) => Promise<void>;

  verifyOtp: (data: {
    username: string;
    otp: number;
  }) => Promise<any>;

  forgotPasswordUser: (
    pan: string,
    username: string
  ) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  formError: "",

  setFormError: (msg) => set({ formError: msg }),

  startHandshake: async () => {
    await preAuthHandshake();
  },

  loginUser: async (data) => {
    try {
      await login(data);
      set({ formError: "" });
    } catch {
      set({ formError: "Invalid username or password" });
      throw new Error();
    }
  },

  verifyOtp: async (data) => {
    try {
      const res = await validateOTP(data);
      set({ formError: "" });
      return res;
    } catch {
      set({ formError: "Invalid OTP" });
      throw new Error();
    }
  },

  forgotPasswordUser: async (pan, username) => {
    await forgotPassword(pan, username);
  },
}));