"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { apiFetch } from "@/app/lib/api";
import { Loader2, BookOpen, Clock, DollarSign, Star } from "lucide-react";

export default function UserDashboardPage() {
  const [summary, setSummary] = useState(null);
  const [history, setHistory] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isMounted = useRef(true);

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [summaryData, historyData, reviewsData] = await Promise.all([
        apiFetch("/api/user/summary"),
        apiFetch("/api/user/delivery-history"),
        apiFetch("/api/user/my-reviews"),
      ]);

      if (isMounted.current) {
        setSummary(summaryData);
        setHistory(Array.isArray(historyData) ? historyData : historyData.deliveries || []);
        setReviews(Array.isArray(reviewsData) ? reviewsData : reviewsData.reviews || []);
      }
    } catch (err) {
      if (isMounted.current) {
        setError(
          err.status === 401
            ? "Unauthorized. Please log in again."
            : "Failed to load dashboard data."
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
      await fetchDashboardData();
    }
    loadData();

    return () => {
      isMounted.current = false;
    };
  }, [fetchDashboardData]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="animate-spin text-violet-500" size={32} />
      </div>
    );
  }

  if (error) {
    return <div className="p-8 text-center text-red-400 font-medium">{error}</div>;
  }

  return (
    <div className="p-2 md:p-6 space-y-8">
      <h1 className="text-2xl font-bold text-white">My Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl shadow-sm">
          <BookOpen className="text-violet-400" size={22} />
          <p className="text-gray-400 text-sm mt-2">Total Orders</p>
          <p className="text-2xl font-bold text-white">{summary?.totalOrders ?? 0}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl shadow-sm">
          <Clock className="text-yellow-400" size={22} />
          <p className="text-gray-400 text-sm mt-2">Pending Deliveries</p>
          <p className="text-2xl font-bold text-white">{summary?.pendingOrders ?? 0}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl shadow-sm">
          <DollarSign className="text-green-400" size={22} />
          <p className="text-gray-400 text-sm mt-2">Total Spent</p>
          <p className="text-2xl font-bold text-white">৳ {summary?.totalSpent ?? 0}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl shadow-sm">
          <Star className="text-orange-400" size={22} />
          <p className="text-gray-400 text-sm mt-2">Total Reviews</p>
          <p className="text-2xl font-bold text-white">{summary?.totalReviews ?? 0}</p>
        </div>
      </div>

      {/* Delivery History */}
      <div>
        <h2 className="text-xl font-bold mb-3 text-white">Delivery History</h2>
        <div className="overflow-x-auto bg-zinc-900 border border-zinc-800 rounded-xl shadow-sm">
          <table className="w-full text-sm text-left">
            <thead className="bg-zinc-800 text-gray-300">
              <tr>
                <th className="p-3">Book Title</th>
                <th className="p-3">Fee</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {history.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-gray-500">
                    No delivery history yet
                  </td>
                </tr>
              )}
              {history.map((h) => (
                <tr key={h._id} className="border-t border-zinc-800 hover:bg-zinc-800/40 transition">
                  <td className="p-3 text-white font-medium">{h.title}</td>
                  <td className="p-3 text-green-400 font-semibold">৳ {h.deliveryFee}</td>
                  <td className="p-3 text-gray-400">{new Date(h.requestedAt).toLocaleDateString()}</td>
                  <td className="p-3">
                    <span className="px-2.5 py-1 rounded-full bg-zinc-800 text-gray-300 text-xs font-semibold">
                      {h.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* My Reviews */}
      <div>
        <h2 className="text-xl font-bold mb-3 text-white">My Reviews</h2>
        <div className="space-y-3">
          {reviews.length === 0 && (
            <p className="text-gray-500 text-sm">You haven&apos;t left any reviews yet.</p>
          )}
          {reviews.map((r) => (
            <div key={r._id} className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl shadow-sm">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white">Rating: {r.rating} ⭐</span>
                <span className="text-xs text-gray-400">{new Date(r.createdAt).toLocaleDateString()}</span>
              </div>
              <p className="text-gray-300 mt-1 text-sm">{r.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}