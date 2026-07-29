"use client";

import { useEffect, useState, useCallback } from "react";

const baseURI =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_SERVER_URL ||
  "http://localhost:5000";

export default function UserChart() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserSummary = useCallback(async () => {
    let isMounted = true;
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${baseURI}/api/user/summary`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Cross-origin cookies / Better Auth sessions
        cache: "no-store",
      });

      // Specific Status Handling
      if (res.status === 404) {
        throw new Error("Summary API endpoint not found (404). Check Express backend routes.");
      }

      if (!res.ok) {
        throw new Error(`Failed to load summary (Status: ${res.status})`);
      }

      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const result = await res.json();
        if (isMounted) setData(result);
      } else {
        throw new Error("Invalid response format from server (Expected JSON).");
      }
    } catch (err) {
      console.error("Error fetching user summary:", err);
      if (isMounted) setError(err.message || "Failed to load user summary.");
    } finally {
      if (isMounted) setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserSummary();
  }, [fetchUserSummary]);

  // Skeleton Loading State
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="p-5 bg-zinc-900/60 rounded-xl animate-pulse border border-zinc-800"
          >
            <div className="h-4 w-28 bg-zinc-700/50 rounded mb-3"></div>
            <div className="h-8 w-16 bg-zinc-700 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  // Error State with Retry button
  if (error) {
    return (
      <div className="p-4 bg-red-950/40 border border-red-800/60 rounded-xl text-red-400 text-sm flex items-center justify-between">
        <span>⚠️ {error}</span>
        <button
          onClick={fetchUserSummary}
          className="px-3 py-1 bg-red-900/50 hover:bg-red-800 text-xs text-red-200 rounded-md transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  // Backend Key Fallbacks
  const pendingCount =
    data?.pendingRequests ??
    data?.pendingCount ??
    data?.pendingBooks ??
    data?.pending ??
    0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {/* Currently Reading */}
      <div className="p-5 bg-zinc-900 border border-zinc-800/80 rounded-xl shadow-sm hover:border-zinc-700 transition-all">
        <h2 className="text-sm font-medium text-zinc-400 mb-1">Currently Reading</h2>
        <p className="text-3xl text-white font-extrabold">
          {data?.currentlyReading ?? 0}
        </p>
      </div>

      {/* Total Borrowed */}
      <div className="p-5 bg-zinc-900 border border-zinc-800/80 rounded-xl shadow-sm hover:border-zinc-700 transition-all">
        <h2 className="text-sm font-medium text-zinc-400 mb-1">Total Borrowed</h2>
        <p className="text-3xl text-white font-extrabold">
          {data?.totalBorrowed ?? 0}
        </p>
      </div>

      {/* Wishlist */}
      <div className="p-5 bg-zinc-900 border border-zinc-800/80 rounded-xl shadow-sm hover:border-zinc-700 transition-all">
        <h2 className="text-sm font-medium text-zinc-400 mb-1">Wishlist</h2>
        <p className="text-3xl text-white font-extrabold">
          {data?.wishlistCount ?? 0}
        </p>
      </div>

      {/* Pending Requests */}
      <div className="p-5 bg-zinc-900 border border-amber-500/20 rounded-xl shadow-sm hover:border-amber-500/40 transition-all">
        <h2 className="text-sm font-medium text-amber-400 mb-1">Pending Requests</h2>
        <p className="text-3xl text-white font-extrabold">{pendingCount}</p>
      </div>
    </div>
  );
}