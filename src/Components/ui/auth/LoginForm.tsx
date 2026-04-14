import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { signin } from "../../../api/auth";
import { useAuth } from "../../../context/useAuth";
import axios from "axios";

interface ErrorResponse {
  message: string;
}

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setError(null); // Clear previous errors

    try {
      setLoading(true);

      const res = await signin(formData);

      const token = res.data?.data?.token || res.data?.token;

      if (!token) {
        throw new Error("No token received");
      }

      await login(token); 
      navigate("/dashboard");

    } catch (err) {
      console.error("Login error:", err);
      if (axios.isAxiosError<ErrorResponse>(err)) {
        const message = err.response?.data?.message || err.message || "Login failed";
        setError(message);
      } else {
        setError("Unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-semibold text-black dark:text-white mb-2">
          Welcome Back
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Log in to your Ambalay Maps account
        </p>
      </div>

      {/* Form */}
      <div className="w-full max-w-md bg-white dark:bg-[#0f0f0f] border border-gray-100 dark:border-white/5 p-8 md:p-10 rounded-2xl shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="abebe@company.com"
              className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-black border border-gray-200 dark:border-white/10 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#8cff2e]"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <Link to="/forgot-password" className="text-xs text-[#8cff2e] hover:underline">
                Forgot password?
              </Link>
            </div>

            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-black border border-gray-200 dark:border-white/10 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#8cff2e]"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-white"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-sm text-center bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 bg-[#8cff2e] text-white font-semibold rounded-lg shadow-lg mt-4 active:scale-[0.98]"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#8cff2e] font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}