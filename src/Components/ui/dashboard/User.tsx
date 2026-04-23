import { getUsers, type User } from "../../../api/user";
import { useEffect, useState, useCallback } from "react";
import { DashboardButton, DashboardCard, DashboardHeader } from "./DashboardShell";

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

    setUsers(res.data || []);               
    setTotal(res.pagination.totalItems);    
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
    <DashboardCard>
      <DashboardHeader
        kicker="Administration"
        title="Users"
        subtitle={`${total} total account${total === 1 ? "" : "s"}`}
        actions={(
          <>
            <DashboardButton disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
              Previous
            </DashboardButton>
            <span>Page {page} of {totalPages}</span>
            <DashboardButton disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>
              Next
            </DashboardButton>
          </>
        )}
      />

      <div className="overflow-x-auto">
      <table className="w-full text-sm text-left min-w-[720px]">
        <thead className="text-gray-500 border-b border-white/10">
          <tr>
            <th className="py-3 pr-4">Created</th>
            <th className="pr-4">Name</th>
            <th className="pr-4">Email</th>
            <th className="pr-4">Access Level</th>
            <th>Updated</th>
          </tr>
        </thead>

        <tbody className="text-gray-300">
          {users.map((user) => (
            <tr key={user.id} className="border-b border-white/5 hover:bg-white/[0.03] transition-colors">
              <td className="py-4 pr-4 text-gray-400">
                {new Date(user.createdAt).toLocaleString()}
              </td>

              <td className="pr-4 font-medium text-white">
                {user.firstName} {user.lastName}
              </td>

              <td className="pr-4">{user.email}</td>

              <td className="pr-4">
                <span
                  className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                    user.accessLevel === "ADMIN"
                      ? "bg-[#8cff2e]/10 text-[#8cff2e] border-[#8cff2e]/20"
                      : "bg-white/5 text-gray-300 border-white/10"
                  }`}
                >
                  {user.accessLevel}
                </span>
              </td>

              <td className="text-gray-400">
                {new Date(user.updatedAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </DashboardCard>
  );
}
