import { Eye } from 'lucide-react'
import { useState } from 'react'
import { updateProfile, changePassword } from '../../../api/user'
import axios from 'axios'
import { useAuth } from '../../../context/useAuth'
import { useEffect } from 'react'
import {
  DashboardButton,
  DashboardCard,
  DashboardHeader,
} from './DashboardShell'

interface UpdateProfileError {
  status: string
  data?: {
    firstName?: string
    lastName?: string
  }
  message: string
}

export default function AccountSettings() {
  // 🔹 Profile state

  const { user } = useAuth()

  const [firstName, setFirstName] = useState(user?.firstName || '')
  const [lastName, setLastName] = useState(user?.lastName || '')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // 🔹 Password state
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [passwordLoading, setPasswordLoading] = useState(false)
  const [passwordError, setPasswordError] = useState('')
  const [passwordSuccess, setPasswordSuccess] = useState('')

  const handleUpdate = async () => {
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      await updateProfile(firstName, lastName)

      setSuccess('Profile updated successfully')
    } catch (err) {
      if (axios.isAxiosError<UpdateProfileError>(err)) {
        const backendErrors = err.response?.data?.data

        if (backendErrors?.firstName) {
          setError(backendErrors.firstName)
        } else if (backendErrors?.lastName) {
          setError(backendErrors.lastName)
        } else {
          setError('Something went wrong')
        }
      } else {
        setError('Network error')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleChangePassword = async () => {
    setPasswordError('')
    setPasswordSuccess('')

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError('All fields are required')
      return
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match')
      return
    }

    try {
      setPasswordLoading(true)

      await changePassword(currentPassword, newPassword)

      setPasswordSuccess('Password changed successfully')

      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message

        if (message === 'INVALID_CREDENTIALS') {
          setPasswordError('Current password is incorrect')
        } else {
          setPasswordError('Failed to change password')
        }
      } else {
        setPasswordError('Network error')
      }
    } finally {
      setPasswordLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName)
      setLastName(user.lastName)
    }
  }, [user])

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 space-y-6 duration-500">
      <DashboardHeader
        kicker="Settings"
        title="Account"
        subtitle="Manage your profile details and login credentials."
      />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <DashboardCard>
          <h2 className="mb-6 text-lg font-semibold text-white">
            Update Account
          </h2>

          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-xs uppercase text-gray-400">
                Email
              </label>
              <input
                disabled
                value={user?.email || ''}
                className="w-full rounded-lg border border-white/10 bg-[#070707] px-4 py-2.5 text-gray-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs uppercase text-gray-400">
                First Name
              </label>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-[#070707] px-4 py-2.5 text-white outline-none focus:ring-2 focus:ring-[#8cff2e]/30"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs uppercase text-gray-400">
                Last Name
              </label>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-[#070707] px-4 py-2.5 text-white outline-none focus:ring-2 focus:ring-[#8cff2e]/30"
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}
            {success && <p className="text-sm text-green-500">{success}</p>}

            <DashboardButton
              onClick={handleUpdate}
              disabled={loading}
              variant="primary"
              className="mt-4 w-full py-3 font-bold"
            >
              {loading ? 'Updating...' : 'Update Account'}
            </DashboardButton>
          </div>
        </DashboardCard>

        <DashboardCard>
          <h2 className="mb-6 text-lg font-semibold text-white">
            Change Password
          </h2>

          <div className="space-y-4">
            {/* Current */}
            <div>
              <label className="mb-1 block text-xs uppercase text-gray-400">
                Current Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-[#070707] px-4 py-2.5 text-white outline-none focus:ring-2 focus:ring-[#8cff2e]/30"
                />
                <Eye
                  size={18}
                  className="absolute right-3 top-3 text-gray-600"
                />
              </div>
            </div>

            {/* New */}
            <div>
              <label className="mb-1 block text-xs uppercase text-gray-400">
                New Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-[#070707] px-4 py-2.5 text-white outline-none focus:ring-2 focus:ring-[#8cff2e]/30"
                />
                <Eye
                  size={18}
                  className="absolute right-3 top-3 text-gray-600"
                />
              </div>
            </div>

            {/* Confirm */}
            <div>
              <label className="mb-1 block text-xs uppercase text-gray-400">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-[#070707] px-4 py-2.5 text-white outline-none focus:ring-2 focus:ring-[#8cff2e]/30"
                />
                <Eye
                  size={18}
                  className="absolute right-3 top-3 text-gray-600"
                />
              </div>
            </div>

            {passwordError && (
              <p className="text-sm text-red-500">{passwordError}</p>
            )}
            {passwordSuccess && (
              <p className="text-sm text-green-500">{passwordSuccess}</p>
            )}

            <DashboardButton
              onClick={handleChangePassword}
              disabled={passwordLoading}
              variant="primary"
              className="mt-4 w-full py-3 font-bold"
            >
              {passwordLoading ? 'Changing...' : 'Change Password'}
            </DashboardButton>
          </div>
        </DashboardCard>
      </div>
    </div>
  )
}
