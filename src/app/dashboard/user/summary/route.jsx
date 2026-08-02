"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { apiFetch } from "@/app/lib/api";
import { Loader2 } from "lucide-react";

export default function UserHomePage() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isMounted = useRef(true);

  const fetchSummary = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiFetch("/api/user/summary");
      if (isMounted.current) {
        setSummary(data);
      }
    } catch (err) {
      if (isMounted.current) {
        setError(
          err.status === 401
            ? "Unauthorized. Please log in again."
            : "Summary data load failed."
        );
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    isMounted.current = true;

    async function loadData() {
      await fetchSummary();
    }
    loadData();

    return () => {
      isMounted.current = false;
    };
  }, [fetchSummary]);

  if (loading)
    return (
      <div className="flex justify-center p-10">
        <Loader2 className="animate-spin text-violet-500" size={28} />
      </div>
    );

  if (error)
    return <div className="p-8 text-center text-red-500 font-medium">{error}</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-white">User Dashboard</h1>
      
      {/* 📊 Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
          <h3 className="text-sm text-gray-400">Total Orders</h3>
          <p className="text-2xl font-bold text-white">{summary?.totalOrders || 0}</p>
        </div>
        <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
          <h3 className="text-sm text-gray-400">Pending Orders</h3>
          <p className="text-2xl font-bold text-white">{summary?.pendingOrders || 0}</p>
        </div>
        <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
          <h3 className="text-sm text-gray-400">Total Spent</h3>
          <p className="text-2xl font-bold text-white">৳ {summary?.totalSpent || 0}</p>
        </div>
        <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
          <h3 className="text-sm text-gray-400">Reviews Given</h3>
          <p className="text-2xl font-bold text-white">{summary?.totalReviews || 0}</p>
        </div>
      </div>
    </div>
  );
}