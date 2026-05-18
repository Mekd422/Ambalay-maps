import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuthErrorMessage, signin } from '../../../api/auth'

interface LoginFormProps {
  flashMessage?: string
}

export default function LoginForm({ flashMessage }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields')
      return
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email')
      return
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setError(null)

    try {
      setLoading(true)

      const challenge = await signin(formData)
      const params = new URLSearchParams({
        flow: 'signin',
        challengeId: challenge.challengeId,
        expiresAt: challenge.expiresAt,
      })

      navigate(`/verify-otp?${params.toString()}`)
    } catch (err) {
      console.error('Login error:', err)
      setError(getAuthErrorMessage(err, 'Login failed'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex w-full flex-col items-center justify-center py-12">
      {/* Header */}
      <div className="mb-10 text-center">
        <h2 className="mb-2 text-3xl font-semibold text-black dark:text-white">
          Welcome Back
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Log in to your Ambalay Maps account
        </p>
      </div>

      {/* Form */}
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-2xl dark:border-white/5 dark:bg-[#0f0f0f] md:p-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          {flashMessage && (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-center text-sm text-emerald-600 dark:border-emerald-800 dark:bg-emerald-900/20">
              {flashMessage}
            </div>
          )}

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
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-[#8cff2e] dark:border-white/10 dark:bg-black dark:text-white"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-xs text-[#8cff2e] hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <div className="relative">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-[#8cff2e] dark:border-white/10 dark:bg-black dark:text-white"
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
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-center text-sm text-red-500 dark:border-red-800 dark:bg-red-900/20">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full rounded-lg bg-[#8cff2e] px-4 py-3.5 font-semibold text-black shadow-lg active:scale-[0.98]"
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="font-medium text-[#8cff2e] hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
