import { Eye } from "lucide-react";
import { useState } from "react";
import { updateProfile, changePassword } from "../../../api/user";
import axios from "axios";
import { useAuth } from "../../../context/useAuth";
import { useEffect } from "react";



interface UpdateProfileError {
  status: string;
  data?: {
    firstName?: string;
    lastName?: string;
  };
  message: string;
}

export default function AccountSettings() {
  // 🔹 Profile state

const { user } = useAuth();

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 🔹 Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  
  const handleUpdate = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await updateProfile(firstName, lastName);

      setSuccess("Profile updated successfully");
      console.log(res);
    } catch (err) {
      if (axios.isAxiosError<UpdateProfileError>(err)) {
        const backendErrors = err.response?.data?.data;

        if (backendErrors?.firstName) {
          setError(backendErrors.firstName);
        } else if (backendErrors?.lastName) {
          setError(backendErrors.lastName);
        } else {
          setError("Something went wrong");
        }
      } else {
        setError("Network error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    setPasswordError("");
    setPasswordSuccess("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    try {
      setPasswordLoading(true);

      await changePassword(currentPassword, newPassword);

      setPasswordSuccess("Password changed successfully");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message;

        if (message === "INVALID_CREDENTIALS") {
          setPasswordError("Current password is incorrect");
        } else {
          setPasswordError("Failed to change password");
        }
      } else {
        setPasswordError("Network error");
      }
    } finally {
      setPasswordLoading(false);
    }
  };

  useEffect(() => {
  if (user) {
    setFirstName(user.firstName);
    setLastName(user.lastName);
  }
}, [user]);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Update Account */}
        <section className="bg-[#111111] border border-white/5 p-6 rounded-xl shadow-xl">
          <h2 className="text-lg font-semibold mb-6 text-white">Update Account</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1 uppercase">Email</label>
              <input
                disabled
                value={user?.email || ""}
                className="w-full bg-[#070707] border border-white/10 rounded-lg px-4 py-2.5 text-gray-500"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1 uppercase">First Name</label>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full bg-[#070707] border border-white/10 rounded-lg px-4 py-2.5 text-white"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1 uppercase">Last Name</label>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full bg-[#070707] border border-white/10 rounded-lg px-4 py-2.5 text-white"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}

            <button
              onClick={handleUpdate}
              disabled={loading}
              className="w-full bg-[#8cff2e] text-white font-bold py-3 rounded-lg mt-4"
            >
              {loading ? "Updating..." : "Update Account"}
            </button>
          </div>
        </section>

        {/* Change Password */}
        <section className="bg-[#111111] border border-white/5 p-6 rounded-xl shadow-xl">
          <h2 className="text-lg font-semibold mb-6 text-white">Change Password</h2>

          <div className="space-y-4">

            {/* Current */}
            <div>
              <label className="block text-xs text-gray-400 mb-1 uppercase">Current Password</label>
              <div className="relative">
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full bg-[#070707] border border-white/10 rounded-lg px-4 py-2.5 text-white"
                />
                <Eye size={18} className="absolute right-3 top-3 text-gray-600" />
              </div>
            </div>

            {/* New */}
            <div>
              <label className="block text-xs text-gray-400 mb-1 uppercase">New Password</label>
              <div className="relative">
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-[#070707] border border-white/10 rounded-lg px-4 py-2.5 text-white"
                />
                <Eye size={18} className="absolute right-3 top-3 text-gray-600" />
              </div>
            </div>

            {/* Confirm */}
            <div>
              <label className="block text-xs text-gray-400 mb-1 uppercase">Confirm New Password</label>
              <div className="relative">
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-[#070707] border border-white/10 rounded-lg px-4 py-2.5 text-white"
                />
                <Eye size={18} className="absolute right-3 top-3 text-gray-600" />
              </div>
            </div>

            {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
            {passwordSuccess && <p className="text-green-500 text-sm">{passwordSuccess}</p>}

            <button
              onClick={handleChangePassword}
              disabled={passwordLoading}
              className="w-full bg-[#8cff2e] text-white font-bold py-3 rounded-lg mt-4"
            >
              {passwordLoading ? "Changing..." : "Change Password"}
            </button>

          </div>
        </section>

      </div>
    </div>
  );
}