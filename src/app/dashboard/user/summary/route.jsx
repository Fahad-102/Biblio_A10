"use client";

import { useState, useEffect } from "react";

export default function UserHomePage() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/api/user/summary", {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP Error Status: ${res.status}`);
        }

        const data = await res.json();
        setSummary(data);
      } catch (err) {
        console.error("Fetch Error:", err.message);
        setError("Summary data load failed.");
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) return <div className="p-6 text-center text-gray-400">Loading User Dashboard...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

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
          <p className="text-2xl font-bold text-white">${summary?.totalSpent || 0}</p>
        </div>
        <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
          <h3 className="text-sm text-gray-400">Reviews Given</h3>
          <p className="text-2xl font-bold text-white">{summary?.totalReviews || 0}</p>
        </div>
      </div>
    </div>
  );
}