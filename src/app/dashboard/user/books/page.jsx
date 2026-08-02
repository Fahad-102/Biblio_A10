"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/app/lib/api";
import { Loader2 } from "lucide-react";

export default function UserHomePage() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSummary() {
      try {
        const data = await apiFetch("/api/user/summary");
        setSummary(data);
        setError(null);
      } catch (err) {
        setError(
          err.status === 401
            ? "Unauthorized. Please log in again."
            : "Summary data load failed."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchSummary();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center p-10">
        <Loader2 className="animate-spin text-violet-500" size={28} />
      </div>
    );

  if (error)
    return <div className="p-8 text-center text-red-500 font-medium">{error}</div>;

  return (
    <div className="p-2 md:p-6 space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">User Dashboard</h1>

      {/* 📊 Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-5 bg-white border rounded-xl shadow">
          <h3 className="text-sm text-gray-500">Total Orders</h3>
          <p className="text-2xl font-bold text-slate-800 mt-1">
            {summary?.totalOrders || 0}
          </p>
        </div>
        <div className="p-5 bg-white border rounded-xl shadow">
          <h3 className="text-sm text-gray-500">Pending Orders</h3>
          <p className="text-2xl font-bold text-slate-800 mt-1">
            {summary?.pendingOrders || 0}
          </p>
        </div>
        <div className="p-5 bg-white border rounded-xl shadow">
          <h3 className="text-sm text-gray-500">Total Spent</h3>
          <p className="text-2xl font-bold text-slate-800 mt-1">
            ৳ {summary?.totalSpent || 0}
          </p>
        </div>
        <div className="p-5 bg-white border rounded-xl shadow">
          <h3 className="text-sm text-gray-500">Reviews Given</h3>
          <p className="text-2xl font-bold text-slate-800 mt-1">
            {summary?.totalReviews || 0}
          </p>
        </div>
      </div>
    </div>
  );
}