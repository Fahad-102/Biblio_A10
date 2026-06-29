"use client";
import React, { useState, useEffect } from 'react';
import { Shield, Trash2, UserCheck, UserX, Loader2 } from 'lucide-react';

export default function UserManagePage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/users`);
      
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("Oops, we didn't get JSON from the server!");
      }

      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.log("Using safe mock data due to API unavailability.");
      setUsers([
        { _id: "1", name: "Fahad Ahmed", email: "fahad@gmail.com", role: "user" },
        { _id: "2", name: "Rahat Rahman", email: "rahat@gmail.com", role: "librarian" },
        { _id: "3", name: "Admin Bhai", email: "admin@gmail.com", role: "admin" },
        { _id: "4", name: "Sultana Reza", email: "sultana@gmail.com", role: "user" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    if (!confirm(`Are you sure you want to change this user's role to ${newRole}?`)) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole })
      });

      if (res.ok) {
        alert("Role updated successfully!");
        fetchUsers();
      }
    } catch (error) {
      console.error("Error updating role:", error);
      setUsers(users.map(u => u._id === userId ? { ...u, role: newRole } : u));
    }
  };

  const handleUserDelete = async (userId) => {
    if (!confirm("Are you sure you want to delete this user completely?")) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/users/${userId}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        alert("User deleted successfully!");
        fetchUsers();
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      setUsers(users.filter(u => u._id !== userId));
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col justify-center items-center gap-2">
        <Loader2 className="animate-spin text-indigo-600" size={40} />
        <p className="text-sm font-medium text-slate-500">Loading User Directory...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Manage System Users</h2>
        <p className="text-slate-500 text-sm mt-1">Review permissions, change platform roles, or revoke user accounts.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 text-xs font-semibold uppercase tracking-wider">
                <th className="p-4 pl-6">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Current Role</th>
                <th className="p-4 text-center">Actions / Change Role</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 pl-6 font-semibold text-slate-900">{user.name}</td>
                  <td className="p-4 text-slate-500">{user.email}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold capitalize ${
                      user.role === 'admin' ? 'bg-red-50 text-red-600 border border-red-100' :
                      user.role === 'librarian' ? 'bg-violet-50 text-violet-600 border border-violet-100' :
                      'bg-slate-50 text-slate-600 border border-slate-200'
                    }`}>
                      {user.role}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      {user.role !== 'librarian' && user.role !== 'admin' && (
                        <button
                          onClick={() => handleRoleChange(user._id, 'librarian')}
                          className="px-2 py-1 text-xs bg-violet-50 text-violet-600 hover:bg-violet-600 hover:text-white transition-colors gap-1 rounded-lg"
                        >
                          + Librarian
                        </button>
                      )}

                      {user.role !== 'admin' && (
                        <button
                          onClick={() => handleRoleChange(user._id, 'admin')}
                          className="px-2 py-1 text-xs bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors gap-1 rounded-lg"
                        >
                          + Admin
                        </button>
                      )}

                      {user.role !== 'user' && (
                        <button
                          onClick={() => handleRoleChange(user._id, 'user')}
                          className="px-2 py-1 text-xs bg-slate-100 text-slate-600 hover:bg-slate-700 hover:text-white transition-colors gap-1 rounded-lg"
                        >
                          Demote
                        </button>
                      )}

                      <div className="w-px h-4 bg-slate-200 mx-1"></div>

                      <button
                        onClick={() => handleUserDelete(user._id)}
                        className="text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}