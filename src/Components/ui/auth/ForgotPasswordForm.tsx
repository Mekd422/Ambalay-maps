import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword, getAuthErrorMessage } from "../../../api/auth";

export default function ForgotPasswordForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const challenge = await forgotPassword({ email });
      const params = new URLSearchParams({
        challengeId: challenge.challengeId,
        expiresAt: challenge.expiresAt,
      });

      navigate(`/reset-password?${params.toString()}`);
    } catch (err) {
      setError(getAuthErrorMessage(err, "Could not start password reset"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-semibold text-black dark:text-white mb-2">
          Reset your password
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Enter your email and we&apos;ll send a 6-digit reset code.
        </p>
      </div>

      <div className="w-full max-w-md bg-white dark:bg-[#0f0f0f] border border-gray-100 dark:border-white/5 p-8 md:p-10 rounded-2xl shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="abebe@company.com"
              className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-black border border-gray-200 dark:border-white/10 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#8cff2e]"
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 bg-[#8cff2e] text-black font-semibold rounded-lg shadow-lg mt-4 active:scale-[0.98]"
          >
            {loading ? "Sending..." : "Send Reset Code"}
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400">
          Remembered your password?{" "}
          <Link to="/login" className="text-[#8cff2e] font-medium hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
