"use client";
import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDownLeft, Loader2 } from 'lucide-react';
import { authClient } from '@/app/lib/auth-client';

export default function TransactionTable({ role }) {
  const [txns, setTxns] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseURI = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const session = await authClient.getSession();
      const token = session?.data?.session?.token || "";

      const res = await fetch(`${baseURI}/api/transactions`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (!res.ok) throw new Error("Failed to fetch transactions");

      const data = await res.json();
      setTxns(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center p-10">
      <Loader2 className="animate-spin text-indigo-600" size={30} />
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Transaction History</h2>
        <p className="text-slate-500 text-sm mt-1">
          {role === 'admin' ? "Monitor all platform-wide billing activity." : "Review your recent payment history."}
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 text-xs font-semibold uppercase tracking-wider">
                <th className="p-4 pl-6">TXN ID</th>
                <th className="p-4">USER</th>
                <th className="p-4">TYPE</th>
                <th className="p-4">AMOUNT</th>
                <th className="p-4">DATE</th>
                <th className="p-4 text-center">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {txns.length > 0 ? (
                txns.map((txn) => (
                  <tr key={txn._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 pl-6 font-mono text-xs font-semibold text-indigo-600">{txn.id}</td>
                    <td className="p-4 font-medium text-slate-700">{txn.userEmail || "N/A"}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {txn.type === 'Late Fine' ? (
                          <ArrowDownLeft size={16} className="text-amber-500" />
                        ) : (
                          <ArrowUpRight size={16} className="text-emerald-500" />
                        )}
                        <span className="text-slate-600 font-medium">{txn.type}</span>
                      </div>
                    </td>
                    <td className="p-4 font-bold text-slate-900">${txn.amount}</td>
                    <td className="p-4 text-slate-500 text-xs">{new Date(txn.createdAt).toLocaleDateString()}</td>
                    <td className="p-4 text-center">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${
                        txn.status === 'Success' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'
                      }`}>
                        {txn.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-slate-500">No transactions found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}