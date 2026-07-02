"use client";

import { useEffect, useState } from "react";
import { Shield, Trash2, Users, BookUser } from "lucide-react";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const base = process.env.NEXT_PUBLIC_SERVER_URL;

  useEffect(() => {
    fetch(`${base}/api/admin/users`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  const updateRole = async (id, role) => {
    await fetch(`${base}/api/admin/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ role }),
    });

    setUsers((prev) =>
      prev.map((u) => (u._id === id ? { ...u, role } : u))
    );
  };

  const deleteUser = async (id) => {
    const ok = confirm("Delete this user?");
    if (!ok) return;

    await fetch(`${base}/api/admin/users/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    setUsers((prev) => prev.filter((u) => u._id !== id));
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow p-6 animate-pulse h-80" />
    );
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="bg-black text-white rounded-2xl shadow p-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-gray-300 mt-1">
            Manage roles: Admin / Librarian / User
          </p>
        </div>

        <div className="hidden md:flex w-14 h-14 rounded-xl bg-white text-black items-center justify-center">
          <Users size={28} />
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow border overflow-hidden">
        <div className="overflow-x-auto">

          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left">Email</th>
                <th className="px-6 py-4 text-left">Role</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center py-10 text-gray-500">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id} className="border-t hover:bg-gray-50">

                    {/* EMAIL */}
                    <td className="px-6 py-4 font-medium text-gray-700">
                      {user.email}
                    </td>

                    {/* ROLE */}
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.role === "admin"
                            ? "bg-black text-white"
                            : user.role === "librarian"
                            ? "bg-gray-800 text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {user.role || "user"}
                      </span>
                    </td>

                    {/* ACTIONS */}
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2 flex-wrap">

                        {/* MAKE ADMIN */}
                        {user.role !== "admin" && (
                          <button
                            onClick={() => updateRole(user._id, "admin")}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition"
                          >
                            <Shield size={16} />
                            Admin
                          </button>
                        )}

                        {/* MAKE LIBRARIAN */}
                        {user.role !== "librarian" && (
                          <button
                            onClick={() => updateRole(user._id, "librarian")}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-400 text-gray-700 hover:bg-gray-100 transition"
                          >
                            <BookUser size={16} />
                            Librarian
                          </button>
                        )}

                        {/* DELETE */}
                        <button
                          onClick={() => deleteUser(user._id)}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg border border-red-500 text-red-600 hover:bg-red-500 hover:text-white transition"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>

                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>

          </table>

        </div>
      </div>

    </div>
  );
}