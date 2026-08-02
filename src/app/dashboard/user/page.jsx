"use client";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { Loader2, BookOpen, Clock, DollarSign, Star } from "lucide-react";

export default function UserDashboardPage() {
  const [summary, setSummary] = useState(null);
  const [history, setHistory] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      apiFetch("/api/user/summary"),
      apiFetch("/api/user/delivery-history"),
      apiFetch("/api/user/my-reviews"),
    ])
      .then(([summaryData, historyData, reviewsData]) => {
        setSummary(summaryData); setHistory(historyData); setReviews(reviewsData); setLoading(false);
      })
      .catch((err) => {
        setError(err.status === 401 ? "Unauthorized. Please log in again." : "Failed to load dashboard data.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" size={28} /></div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="p-2 md:p-6 space-y-8">
      <h1 className="text-2xl font-bold text-slate-800">My Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl shadow border"><BookOpen className="text-violet-500" size={22} /><p className="text-gray-500 text-sm mt-2">Total Orders</p><p className="text-2xl font-bold">{summary?.totalOrders ?? 0}</p></div>
        <div className="bg-white p-5 rounded-xl shadow border"><Clock className="text-yellow-500" size={22} /><p className="text-gray-500 text-sm mt-2">Pending Deliveries</p><p className="text-2xl font-bold">{summary?.pendingOrders ?? 0}</p></div>
        <div className="bg-white p-5 rounded-xl shadow border"><DollarSign className="text-green-500" size={22} /><p className="text-gray-500 text-sm mt-2">Total Spent</p><p className="text-2xl font-bold">৳ {summary?.totalSpent ?? 0}</p></div>
        <div className="bg-white p-5 rounded-xl shadow border"><Star className="text-orange-500" size={22} /><p className="text-gray-500 text-sm mt-2">Total Reviews</p><p className="text-2xl font-bold">{summary?.totalReviews ?? 0}</p></div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3 text-slate-800">Delivery History</h2>
        <div className="overflow-x-auto bg-white rounded-xl shadow border">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100"><tr><th className="p-3">Book Title</th><th className="p-3">Fee</th><th className="p-3">Date</th><th className="p-3">Status</th></tr></thead>
            <tbody>
              {history.length === 0 && <tr><td colSpan={4} className="p-6 text-center text-gray-400">No delivery history yet</td></tr>}
              {history.map((h) => (
                <tr key={h._id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{h.title}</td>
                  <td className="p-3">৳ {h.deliveryFee}</td>
                  <td className="p-3">{new Date(h.requestedAt).toLocaleDateString()}</td>
                  <td className="p-3"><span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold">{h.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3 text-slate-800">My Reviews</h2>
        <div className="space-y-3">
          {reviews.length === 0 && <p className="text-gray-400 text-sm">You havent left any reviews yet.</p>}
          {reviews.map((r) => (
            <div key={r._id} className="bg-white p-4 rounded-xl shadow border">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Rating: {r.rating} ⭐</span>
                <span className="text-xs text-gray-400">{new Date(r.createdAt).toLocaleDateString()}</span>
              </div>
              <p className="text-gray-600 mt-1 text-sm">{r.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}