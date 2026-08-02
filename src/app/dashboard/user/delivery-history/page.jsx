"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { Package, Calendar, DollarSign, Loader2 } from "lucide-react";
import { apiFetch } from "@/app/lib/api";

export default function DeliveryHistoryPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isMounted = useRef(true);

  const loadHistory = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await apiFetch("/api/user/delivery-history");
      if (isMounted.current) {
        setData(Array.isArray(res) ? res : res.deliveries || []);
      }
    } catch (err) {
      if (isMounted.current) {
        setError(
          err.status === 401
            ? "Unauthorized. Please log in again."
            : "Failed to load delivery history."
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
    
    async function fetchData() {
      await loadHistory();
    }
    fetchData();

    return () => {
      isMounted.current = false;
    };
  }, [loadHistory]);

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
    <div className="space-y-6 p-2 md:p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">
          Delivery History
        </h1>
        <p className="text-gray-400 mt-2">
          Your book delivery records
        </p>
      </div>

      {/* Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-x-auto shadow-sm">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-zinc-800 text-gray-300">
            <tr>
              <th className="px-4 py-3">Book</th>
              <th className="px-4 py-3">Fee</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Requested</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-10 text-gray-500">
                  No delivery history found
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr
                  key={item._id}
                  className="border-t border-zinc-800 hover:bg-zinc-800/40 transition"
                >
                  {/* Book */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Package size={16} className="text-violet-400 shrink-0" />
                      <span className="text-white font-medium">{item.title}</span>
                    </div>
                  </td>

                  {/* Fee */}
                  <td className="px-4 py-3 text-green-400 font-semibold">
                    <div className="flex items-center gap-1">
                      <DollarSign size={16} />
                      <span>৳ {item.deliveryFee}</span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold inline-block
                      ${
                        item.status === "Delivered"
                          ? "bg-green-500/20 text-green-400"
                          : item.status === "Pending"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : item.status === "Accepted" || item.status === "Dispatched"
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="px-4 py-3 text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span>{new Date(item.requestedAt).toLocaleDateString()}</span>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}