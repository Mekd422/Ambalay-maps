import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuthErrorMessage, signup } from '../../../api/auth'

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setError(null)

    try {
      setLoading(true)

      const challenge = await signup({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      })

      const params = new URLSearchParams({
        flow: 'signup',
        challengeId: challenge.challengeId,
        expiresAt: challenge.expiresAt,
      })

      navigate(`/verify-otp?${params.toString()}`)
    } catch (err) {
      setError(getAuthErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex w-full flex-col items-center justify-center py-12">
      {/* Header */}
      <div className="mb-10 text-center">
        <h2 className="mb-2 text-3xl font-semibold text-black dark:text-white">
          Create Account
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Join Ambalay Maps and start exploring
        </p>
      </div>

      {/* Form Card */}
      <div className="w-full max-w-lg rounded-2xl border border-gray-100 bg-white p-8 shadow-2xl dark:border-white/5 dark:bg-[#0f0f0f] md:p-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Names */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                First Name
              </label>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                type="text"
                required
                placeholder="Abebe"
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-black transition-all focus:outline-none focus:ring-2 focus:ring-[#8cff2e] dark:border-white/10 dark:bg-black dark:text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Last Name
              </label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                type="text"
                required
                placeholder="Kebede"
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-black transition-all focus:outline-none focus:ring-2 focus:ring-[#8cff2e] dark:border-white/10 dark:bg-black dark:text-white"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              required
              placeholder="abebe@company.com"
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-black transition-all focus:outline-none focus:ring-2 focus:ring-[#8cff2e] dark:border-white/10 dark:bg-black dark:text-white"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-black transition-all focus:outline-none focus:ring-2 focus:ring-[#8cff2e] dark:border-white/10 dark:bg-black dark:text-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-white"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Confirm Password
            </label>
            <div className="relative">
              <input
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-black transition-all focus:outline-none focus:ring-2 focus:ring-[#8cff2e] dark:border-white/10 dark:bg-black dark:text-white"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-white"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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
            className="mt-4 w-full rounded-lg bg-[#8cff2e] px-4 py-3.5 font-semibold text-black shadow-lg shadow-[#557a3a]/20 transition-all active:scale-[0.98]"
          >
            {loading ? 'Creating...' : 'Create Account'}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          Already have an account?{' '}
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
