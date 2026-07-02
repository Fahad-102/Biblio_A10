"use client";

import { useEffect, useState } from "react";
import { Package, Calendar, DollarSign } from "lucide-react";

const base = process.env.NEXT_PUBLIC_SERVER_URL;

export default function DeliveryHistoryPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${base}/api/user/delivery-history`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-spinner loading-lg text-violet-500"></span>
      </div>
    );
  }

  return (
    <div className="space-y-6">

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
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-x-auto">
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
                      <Package size={16} className="text-violet-400" />
                      <span className="text-white">{item.title}</span>
                    </div>
                  </td>

                  {/* Fee */}
                  <td className="px-4 py-3 text-green-400 font-semibold flex items-center gap-1">
                    <DollarSign size={16} />
                    ৳ {item.deliveryFee}
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        item.status === "Delivered"
                          ? "bg-green-500/20 text-green-400"
                          : item.status === "Pending"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : item.status === "Accepted"
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="px-4 py-3 text-gray-400 flex items-center gap-1">
                    <Calendar size={16} />
                    {new Date(item.requestedAt).toLocaleDateString()}
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