"use client";

import { useEffect, useState } from "react";
import { Receipt, CreditCard } from "lucide-react";

export default function Transactions() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const base = process.env.NEXT_PUBLIC_SERVER_URL;

  useEffect(() => {
    fetch(`${base}/api/admin/transactions`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow p-6 animate-pulse h-96" />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border shadow-sm p-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Transactions
          </h1>

          <p className="text-gray-500 mt-2">
            View all payment history.
          </p>
        </div>

        <div className="hidden md:flex h-14 w-14 rounded-xl bg-black text-white items-center justify-center">
          <Receipt size={28} />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left font-semibold">
                  User
                </th>

                <th className="px-6 py-4 text-left font-semibold">
                  Book
                </th>

                <th className="px-6 py-4 text-left font-semibold">
                  Amount
                </th>

                <th className="px-6 py-4 text-left font-semibold">
                  Date
                </th>

                <th className="px-6 py-4 text-center font-semibold">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="py-12 text-center text-gray-500"
                  >
                    No transactions found.
                  </td>
                </tr>
              ) : (
                data.map((item) => (
                  <tr
                    key={item._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4">
                      {item.userEmail || item.email || "N/A"}
                    </td>

                    <td className="px-6 py-4">
                      {item.bookTitle || item.title || "N/A"}
                    </td>

                    <td className="px-6 py-4 font-semibold">
                      ৳ {item.amount}
                    </td>

                    <td className="px-6 py-4">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                        <CreditCard size={14} />
                        Paid
                      </span>
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