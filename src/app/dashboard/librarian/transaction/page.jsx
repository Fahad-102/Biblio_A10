"use client";

import { useEffect, useState } from "react";
import { DollarSign, Calendar, User, BookOpen } from "lucide-react";

const base = process.env.NEXT_PUBLIC_SERVER_URL;

export default function LibrarianTransactionPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${base}/api/librarian/deliveries`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data || []);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold text-white">
          Transactions
        </h1>

        <p className="text-gray-400 mt-2">
          Delivery payment history.
        </p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-x-auto">

        <table className="table">

          <thead className="bg-zinc-800 text-gray-300">

            <tr>
              <th>User</th>
              <th>Book</th>
              <th>Fee</th>
              <th>Status</th>
              <th>Date</th>
            </tr>

          </thead>

          <tbody>

            {transactions.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-10 text-gray-500"
                >
                  No transactions found.
                </td>
              </tr>
            ) : (
              transactions.map((item) => (
                <tr
                  key={item._id}
                  className="border-t border-zinc-800 hover:bg-zinc-800/40"
                >
                  <td>

                    <div className="flex items-center gap-2">

                      <User
                        size={18}
                        className="text-violet-400"
                      />

                      <div>
                        <p className="text-white font-medium">
                          {item.user?.name || "Unknown"}
                        </p>

                        <p className="text-xs text-gray-400">
                          {item.user?.email}
                        </p>
                      </div>

                    </div>

                  </td>

                  <td>

                    <div className="flex items-center gap-2">

                      <BookOpen
                        size={18}
                        className="text-violet-400"
                      />

                      <span className="text-white">
                        {item.title}
                      </span>

                    </div>

                  </td>

                  <td>

                    <div className="flex items-center gap-2 text-green-400 font-semibold">

                      <DollarSign size={18} />

                      ৳ {item.deliveryFee}

                    </div>

                  </td>

                  <td>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        item.status === "Delivered"
                          ? "bg-green-500/20 text-green-400"
                          : item.status === "Accepted"
                          ? "bg-blue-500/20 text-blue-400"
                          : item.status === "Rejected"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {item.status}
                    </span>

                  </td>

                  <td>

                    <div className="flex items-center gap-2 text-gray-400">

                      <Calendar size={16} />

                      {new Date(item.requestedAt).toLocaleDateString()}

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