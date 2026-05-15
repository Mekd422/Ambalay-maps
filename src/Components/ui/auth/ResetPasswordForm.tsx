import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import {
  getAuthErrorMessage,
  resendOtp,
  resetPassword,
} from '../../../api/auth'

const formatExpiry = (expiresAt: string | null) => {
  if (!expiresAt) {
    return null
  }

  const date = new Date(expiresAt)

  if (Number.isNaN(date.getTime())) {
    return null
  }

  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const getTimeRemaining = (expiresAt: string | null) => {
  if (!expiresAt) {
    return null
  }

  const expiresAtMs = new Date(expiresAt).getTime()

  if (Number.isNaN(expiresAtMs)) {
    return null
  }

  const remainingMs = Math.max(0, expiresAtMs - Date.now())
  const totalSeconds = Math.floor(remainingMs / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

export default function ResetPasswordForm() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [formData, setFormData] = useState({
    otp: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const challengeId = searchParams.get('challengeId')
  const expiresAt = searchParams.get('expiresAt')
  const expiresLabel = formatExpiry(expiresAt)
  const [timeRemaining, setTimeRemaining] = useState(() =>
    getTimeRemaining(expiresAt),
  )

  useEffect(() => {
    setTimeRemaining(getTimeRemaining(expiresAt))

    if (!expiresAt) {
      return
    }

    const intervalId = window.setInterval(() => {
      setTimeRemaining(getTimeRemaining(expiresAt))
    }, 1000)

    return () => window.clearInterval(intervalId)
  }, [expiresAt])

  const updateChallenge = (nextChallengeId: string, nextExpiresAt: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('challengeId', nextChallengeId)
    params.set('expiresAt', nextExpiresAt)
    setSearchParams(params, { replace: true })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((current) => ({
      ...current,
      [name]: name === 'otp' ? value.replace(/\D/g, '').slice(0, 6) : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!challengeId) {
      setError('Reset session is missing')
      return
    }

    if (!/^\d{6}$/.test(formData.otp)) {
      setError('Enter the 6-digit code sent to your email')
      return
    }

    if (formData.newPassword.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setError(null)
    setLoading(true)

    try {
      await resetPassword({
        challengeId,
        otp: formData.otp,
        newPassword: formData.newPassword,
      })

      navigate('/login', {
        replace: true,
        state: { flash: 'Password updated' },
      })
    } catch (err) {
      setError(getAuthErrorMessage(err, 'Could not reset password'))
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    if (!challengeId) {
      setError('Reset session is missing')
      return
    }

    setError(null)
    setResending(true)

    try {
      const challenge = await resendOtp({ challengeId })
      updateChallenge(challenge.challengeId, challenge.expiresAt)
      setFormData((current) => ({ ...current, otp: '' }))
    } catch (err) {
      setError(getAuthErrorMessage(err, 'Could not resend code'))
    } finally {
      setResending(false)
    }
  }

  if (!challengeId) {
    return (
      <div className="flex w-full flex-col items-center justify-center py-12">
        <div className="w-full max-w-md space-y-4 rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-2xl dark:border-white/5 dark:bg-[#0f0f0f] md:p-10">
          <h2 className="text-3xl font-semibold text-black dark:text-white">
            Invalid reset link
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Start the password reset process again to receive a fresh code.
          </p>
          <Link
            to="/forgot-password"
            className="font-medium text-[#8cff2e] hover:underline"
          >
            Request a new code
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col items-center justify-center py-12">
      <div className="mb-10 text-center">
        <h2 className="mb-2 text-3xl font-semibold text-black dark:text-white">
          Set a new password
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Enter the reset code from your email and choose a new password.
        </p>
        {expiresLabel && (
          <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
            Code expires around {expiresLabel}
            {timeRemaining ? ` (${timeRemaining} left)` : ''}
          </p>
        )}
      </div>

      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-2xl dark:border-white/5 dark:bg-[#0f0f0f] md:p-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Reset Code
            </label>
            <input
              name="otp"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              value={formData.otp}
              onChange={handleChange}
              placeholder="123456"
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-center tracking-[0.35em] text-black focus:outline-none focus:ring-2 focus:ring-[#8cff2e] dark:border-white/10 dark:bg-black dark:text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              New Password
            </label>
            <input
              name="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-[#8cff2e] dark:border-white/10 dark:bg-black dark:text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Confirm New Password
            </label>
            <input
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-[#8cff2e] dark:border-white/10 dark:bg-black dark:text-white"
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
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>

        <div className="mt-8 space-y-3 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Didn&apos;t get the code?</p>
          <button
            type="button"
            disabled={resending}
            onClick={handleResend}
            className="font-medium text-[#8cff2e] hover:underline disabled:opacity-60"
          >
            {resending ? 'Sending...' : 'Resend code'}
          </button>
          <p>
            <Link
              to="/login"
              className="font-medium text-[#8cff2e] hover:underline"
            >
              Back to login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
