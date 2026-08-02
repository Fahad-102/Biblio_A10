"use client";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { apiFetch } from "@/app/lib/api";

export default function AdminTransactionPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiFetch("/api/admin/transactions")
      .then((data) => { setTransactions(data); setLoading(false); })
      .catch((err) => {
        setError(err.status === 401 ? "Unauthorized. Please log in again." : "Failed to load transactions.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" size={28} /></div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="p-2 md:p-6 space-y-4">
      <h1 className="text-2xl font-bold text-slate-800">All Transactions</h1>
      <div className="overflow-x-auto bg-white rounded-xl shadow border">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100"><tr><th className="p-3">Transaction ID</th><th className="p-3">User Email</th><th className="p-3">Amount</th><th className="p-3">Date</th></tr></thead>
          <tbody>
            {transactions.length === 0 && <tr><td colSpan={4} className="p-6 text-center text-gray-400">No transactions found</td></tr>}
            {transactions.map((t) => (
              <tr key={t._id} className="border-t hover:bg-gray-50">
                <td className="p-3 font-mono text-xs">{t.transactionId}</td>
                <td className="p-3">{t.userEmail}</td>
                <td className="p-3">৳ {t.amount}</td>
                <td className="p-3">{new Date(t.date || t.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}