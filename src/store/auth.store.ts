import { create } from "zustand";
import {
  login,
  validateOTP,
  forgotPassword,
  forgotUserID,
  preAuthHandshake,
  logout
} from "../api/auth.api";

interface AuthState {
  formMessage: string;
  isSuccess: boolean;
  isAuthenticated: boolean;
  setFormMessage: (msg: string) => void;

  startHandshake: () => Promise<void>;

  loginUser: (data: {
    username: string;
    password: string;
  }) => Promise<void>;

  verifyOtp: (data: {
    username: string;
    otp: number;
  }) => Promise<any>;

  forgotUserID: (data: {
    panNumber: string,
    emailId: string
  }) => Promise<void>;

  forgotPasswordUser: (data: {
    panNumber: string,
    username: string
  }) => Promise<void>;

  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  formMessage: "",
  isSuccess: false,
  isAuthenticated: !!localStorage.getItem("access_token"),

  setFormMessage: (msg) => set({ formMessage: msg }),

  startHandshake: async () => {
    await preAuthHandshake();
  },

  loginUser: async (data) => {
    try {
      await login(data);
      set({ formMessage: "" });
    } catch {
      set({ isSuccess: false, formMessage: "Invalid username or password" });
      throw new Error();
    }
  },

  verifyOtp: async (data) => {
    try {
      const res = await validateOTP(data);
      set({ formMessage: "" });
      localStorage.setItem(
        "access_token",
        res.jwtTokens.accessToken
      );
      localStorage.setItem("refresh_token",
        res.jwtTokens.refreshToken
      )
      set({isAuthenticated: true, formMessage: ""});
      return res;
    } catch {
      set({ isSuccess: false, formMessage: "Invalid OTP" });
      throw new Error();
    }
  },

  forgotUserID: async (data) => {
    try {
      await forgotUserID(data);
      set({ isSuccess: true, formMessage: "User ID has been sent to your registered mail" });
    } catch {
      set({ isSuccess: false, formMessage: "Invalid email or PAN number" });
      throw new Error();
    } 
  },

  forgotPasswordUser: async (data) => {
    try {
      await forgotPassword(data);
      set({ isSuccess: true, formMessage: "New password has been successfully updated" });
    } catch {
      set({ isSuccess: false, formMessage: "Invalid user id or PAN number" });
      throw new Error();
    } 
  },

  logout: async () => {
    await logout();
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    set({isAuthenticated: false})
  }
}));