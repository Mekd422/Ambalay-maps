import axios from "axios";
import type { User } from "../context/AuthContext";
import API from "./axios";

interface ApiResponse<T> {
  status: string;
  data: T;
  message: string;
  timestamp: string;
  requestId: string;
}

interface ApiErrorResponse {
  status: string;
  message: string;
  timestamp: string;
  requestId: string;
}

export interface OtpChallenge {
  challengeId: string;
  expiresAt: string;
}

export interface AuthVerificationResult {
  token: string;
  user: User;
}

const AUTH_ERROR_MESSAGES: Record<string, string> = {
  EMAIL_ALREADY_EXISTS: "Email already exists",
  DISPOSABLE_EMAIL_NOT_ALLOWED: "Disposable email addresses are not allowed",
  OTP_RESEND_TOO_SOON: "Please wait before requesting another code",
  OTP_EMAIL_SEND_FAILED: "We could not send the verification code",
  VALIDATION_ERROR: "Please check the form and try again",
  USER_NOT_IDENTIFIED: "User not identified",
  INVALID_CREDENTIALS: "Invalid email or password",
  EMAIL_NOT_VERIFIED: "Email is not verified",
  OTP_CHALLENGE_NOT_FOUND: "Verification session not found",
  OTP_ALREADY_USED: "This code has already been used",
  OTP_EXPIRED: "This code has expired",
  INVALID_OTP: "Invalid verification code",
  OTP_ATTEMPTS_EXCEEDED: "Too many incorrect attempts",
  OTP_CHALLENGE_INVALID: "Verification session is invalid",
  USER_NOT_FOUND: "User not found",
};

export const getAuthErrorMessage = (error: unknown, fallback = "Something went wrong") => {
  if (!axios.isAxiosError<ApiErrorResponse>(error)) {
    return fallback;
  }

  const code = error.response?.data?.message;

  if (!code) {
    return error.message || fallback;
  }

  return AUTH_ERROR_MESSAGES[code] ?? code.replaceAll("_", " ").toLowerCase();
};

export const signup = async (data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  const res = await API.post<ApiResponse<OtpChallenge>>("/auth/signup", data);
  return res.data.data;
};

export const verifySignup = async (data: {
  challengeId: string;
  otp: string;
}) => {
  const res = await API.post<ApiResponse<AuthVerificationResult>>("/auth/signup/verify", data);
  return res.data.data;
};

export const signin = async (data: {
  email: string;
  password: string;
}) => {
  const res = await API.post<ApiResponse<OtpChallenge>>("/auth/signin", data);
  return res.data.data;
};

export const verifySignin = async (data: {
  challengeId: string;
  otp: string;
}) => {
  const res = await API.post<ApiResponse<AuthVerificationResult>>("/auth/signin/verify", data);
  return res.data.data;
};

export const resendOtp = async (data: { challengeId: string }) => {
  const res = await API.post<ApiResponse<OtpChallenge>>("/auth/otp/resend", data);
  return res.data.data;
};

export const forgotPassword = async (data: { email: string }) => {
  const res = await API.post<ApiResponse<OtpChallenge>>("/auth/forgot_password", data);
  return res.data.data;
};

export const resetPassword = async (data: {
  challengeId: string;
  otp: string;
  newPassword: string;
}) => {
  const res = await API.post<ApiResponse<Record<string, never>>>("/auth/reset_password", data);
  return res.data;
};
