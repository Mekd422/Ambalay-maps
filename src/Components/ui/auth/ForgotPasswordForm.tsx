import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { forgotPassword, getAuthErrorMessage } from '../../../api/auth'

export default function ForgotPasswordForm() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!email) {
      setError('Please enter your email')
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email')
      return
    }

    setError(null)
    setLoading(true)

    try {
      const challenge = await forgotPassword({ email })
      const params = new URLSearchParams({
        challengeId: challenge.challengeId,
        expiresAt: challenge.expiresAt,
      })

      navigate(`/reset-password?${params.toString()}`)
    } catch (err) {
      setError(getAuthErrorMessage(err, 'Could not start password reset'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex w-full flex-col items-center justify-center py-12">
      <div className="mb-10 text-center">
        <h2 className="mb-2 text-3xl font-semibold text-slate-900 dark:text-white">
          Reset your password
        </h2>
        <p className="text-slate-600 dark:text-gray-400">
          Enter your email and we&apos;ll send a 6-digit reset code.
        </p>
      </div>

      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-2xl dark:border-white/5 dark:bg-[#0f0f0f] md:p-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-gray-300">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="abebe@company.com"
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#8cff2e] dark:border-white/10 dark:bg-black dark:text-white"
            />
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-center text-sm text-red-500 dark:border-red-800 dark:bg-red-900/20">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full rounded-lg bg-[#8cff2e] px-4 py-3.5 font-semibold text-black shadow-lg active:scale-[0.98]"
          >
            {loading ? 'Sending...' : 'Send Reset Code'}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-600 dark:text-gray-400">
          Remembered your password?{' '}
          <Link
            to="/login"
            className="font-medium text-[#8cff2e] hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}
