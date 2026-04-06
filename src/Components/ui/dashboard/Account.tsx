import { Eye } from "lucide-react";
import { useState } from "react";
import { updateProfile } from "../../../api/user"; 
import { AxiosError } from "axios";

interface AccountSettingsProps {
  initialName: string;
}

interface UpdateProfileError {
  status: string;
  data?: {
    firstName?: string;
    lastName?: string;
  };
  message: string;
}

export default function AccountSettings({ initialName }: AccountSettingsProps) {
  const [firstName, setFirstName] = useState(initialName);
  const [lastName, setLastName] = useState("Abebe");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleUpdate = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await updateProfile(firstName, lastName);

      setSuccess("Profile updated successfully");
      console.log(res);
    } catch (err) {
        const error = err as AxiosError<UpdateProfileError>;

      if (error.response?.data?.data) {
        // backend validation error
        const backendErrors = error.response.data.data;

        if (backendErrors.firstName) {
          setError(backendErrors.firstName);
        } else if (backendErrors.lastName) {
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

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Update Account Section */}
        <section className="bg-[#111111] border border-white/5 p-6 rounded-xl shadow-xl">
          <h2 className="text-lg font-semibold mb-6 text-white">Update Account</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1 uppercase">Email</label>
              <input
                disabled
                value="michael@ambalaymaps.com"
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

        {/* Change Password Section */}
        <section className="bg-[#111111] border border-white/5 p-6 rounded-xl shadow-xl">
          <h2 className="text-lg font-semibold mb-6 text-white">Change Password</h2>
          <div className="space-y-4">
            {["Current Password", "New Password", "Confirm New Password"].map((label) => (
              <div key={label}>
                <label className="block text-xs text-gray-400 mb-1 uppercase">{label}</label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-[#070707] border border-white/10 rounded-lg px-4 py-2.5 text-white"
                  />
                  <Eye size={18} className="absolute right-3 top-3 text-gray-600 cursor-pointer" />
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}