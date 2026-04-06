import { getUsers, type User } from "../../../api/user";
import { useEffect, useState, useCallback } from "react";

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 6;

  const fetchUsers = useCallback(async () => {
  try {
    setLoading(true);
    const res = await getUsers(page, limit);

    setUsers(res.data.users);
    setTotal(res.data.total);
  } catch (err) {
    console.error("Failed to fetch users", err);
  } finally {
    setLoading(false);
  }
}, [page, limit]);

  useEffect(() => {
  fetchUsers();
}, [fetchUsers]);

  const totalPages = Math.ceil(total / limit);

  if (loading) {
    return <p className="text-gray-400">Loading users...</p>;
  }

  return (
    <div className="bg-[#111111] border border-white/5 rounded-xl shadow-xl p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-white font-semibold text-lg">
          Users ({total})
        </h2>

        <div className="flex items-center gap-3 text-sm text-gray-400">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-2 py-1 bg-[#070707] rounded disabled:opacity-30"
          >
            ◀
          </button>

          <span>Page {page} of {totalPages}</span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-2 py-1 bg-[#070707] rounded disabled:opacity-30"
          >
            ▶
          </button>
        </div>
      </div>

      {/* Table */}
      <table className="w-full text-sm text-left">
        <thead className="text-gray-500 border-b border-white/10">
          <tr>
            <th className="py-3">Created</th>
            <th>Name</th>
            <th>Email</th>
            <th>Access Level</th>
            <th>Updated</th>
          </tr>
        </thead>

        <tbody className="text-gray-300">
          {users.map((user) => (
            <tr key={user.id} className="border-b border-white/5">
              <td className="py-3">
                {new Date(user.createdAt).toLocaleString()}
              </td>

              <td>
                {user.firstName} {user.lastName}
              </td>

              <td>{user.email}</td>

              <td>
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    user.accessLevel === "ADMIN"
                      ? "bg-red-500/20 text-red-400"
                      : "bg-gray-700 text-gray-300"
                  }`}
                >
                  {user.accessLevel}
                </span>
              </td>

              <td>
                {new Date(user.updatedAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}