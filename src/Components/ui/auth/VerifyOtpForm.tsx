import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import {
  getAuthErrorMessage,
  resendOtp,
  verifySignin,
  verifySignup,
} from '../../../api/auth'
import { useAuth } from '../../../context/useAuth'

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

export default function VerifyOtpForm() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [searchParams, setSearchParams] = useSearchParams()
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const flow = searchParams.get('flow')
  const challengeId = searchParams.get('challengeId')
  const expiresAt = searchParams.get('expiresAt')
  const expiresLabel = formatExpiry(expiresAt)
  const [timeRemaining, setTimeRemaining] = useState(() =>
    getTimeRemaining(expiresAt),
  )
  const isValidFlow = flow === 'signup' || flow === 'signin'

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!challengeId || !isValidFlow) {
      setError('Verification session is missing or invalid')
      return
    }

    if (!/^\d{6}$/.test(otp)) {
      setError('Enter the 6-digit code sent to your email')
      return
    }

    setError(null)
    setLoading(true)

    try {
      const result =
        flow === 'signup'
          ? await verifySignup({ challengeId, otp })
          : await verifySignin({ challengeId, otp })

      await login(result.token, result.user)
      navigate('/dashboard', { replace: true })
    } catch (err) {
      setError(getAuthErrorMessage(err, 'Verification failed'))
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    if (!challengeId) {
      setError('Verification session is missing')
      return
    }

    setError(null)
    setResending(true)

    try {
      const challenge = await resendOtp({ challengeId })
      updateChallenge(challenge.challengeId, challenge.expiresAt)
      setOtp('')
    } catch (err) {
      setError(getAuthErrorMessage(err, 'Could not resend code'))
    } finally {
      setResending(false)
    }
  }

  if (!challengeId || !isValidFlow) {
    return (
      <div className="flex w-full flex-col items-center justify-center py-12">
        <div className="w-full max-w-md space-y-4 rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-2xl dark:border-white/5 dark:bg-[#0f0f0f] md:p-10">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">
            Invalid verification link
          </h2>
          <p className="text-slate-600 dark:text-gray-400">
            Start again from login or signup to receive a fresh verification
            code.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <Link
              to="/login"
              className="font-medium text-[#8cff2e] hover:underline"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="font-medium text-[#8cff2e] hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col items-center justify-center py-12">
      <div className="mb-10 text-center">
        <h2 className="mb-2 text-3xl font-semibold text-slate-900 dark:text-white">
          Verify your email
        </h2>
        <p className="text-slate-600 dark:text-gray-400">
          Enter the 6-digit code we sent to complete your{' '}
          {flow === 'signup' ? 'signup' : 'login'}.
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
            <label className="text-sm font-medium text-slate-700 dark:text-gray-300">
              Verification Code
            </label>
            <input
              name="otp"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))
              }
              placeholder="123456"
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-center tracking-[0.35em] text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#8cff2e] dark:border-white/10 dark:bg-black dark:text-white"
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
            {loading ? 'Verifying...' : 'Verify Code'}
          </button>
        </form>

        <div className="mt-8 space-y-3 text-center text-sm text-slate-600 dark:text-gray-400">
          <p>Didn&apos;t get the code?</p>
          <button
            type="button"
            disabled={resending}
            onClick={handleResend}
            className="font-medium text-[#8cff2e] hover:underline disabled:opacity-60"
          >
            {resending ? 'Sending...' : 'Resend code'}
          </button>
        </div>
      </div>
    </div>
  )
}
