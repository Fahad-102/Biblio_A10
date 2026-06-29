"use client";
import React from 'react';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';

export default function TransactionTable({ role }) {
  const transactionData = {
    admin: [
      { id: "TXN1001", user: "Fahad Ahmed", type: "Subscription", amount: "$15.00", date: "2026-06-28", status: "Success" },
      { id: "TXN1002", user: "Rahat Rahman", type: "Late Fine", amount: "$2.50", date: "2026-06-25", status: "Success" },
      { id: "TXN1003", user: "Anik Karim", type: "Book Purchase", amount: "$12.00", date: "2026-06-24", status: "Failed" },
    ],
    librarian: [
      { id: "TXN1002", user: "Rahat Rahman", type: "Late Fine", amount: "$2.50", date: "2026-06-25", status: "Success" },
      { id: "TXN1005", user: "Sultana Reza", type: "Late Fine", amount: "$5.00", date: "2026-06-20", status: "Success" },
    ],
    user: [
      { id: "TXN1001", user: "You", type: "Subscription", amount: "$15.00", date: "2026-06-28", status: "Success" },
      { id: "TXN1003", user: "You", type: "Book Purchase", amount: "$12.00", date: "2026-06-24", status: "Failed" },
    ]
  };

  const currentTxns = transactionData[role] || transactionData.user;
  const isAdminOrLibrarian = role === 'admin' || role === 'librarian';

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Transaction History</h2>
        <p className="text-slate-500 text-sm mt-1">
          {role === 'admin' ? "Monitor all platform-wide billing activity." : "Review your recent payment history and billing statements."}
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
              {currentTxns.map((txn) => (
                <tr key={txn.id} className="hover:bg-slate-50/50 transition-colors">
                  {/* TXN ID */}
                  <td className="p-4 pl-6 font-mono text-xs font-semibold text-indigo-600">
                    {txn.id}
                  </td>
                  
                  {/* USER */}
                  <td className="p-4 font-medium text-slate-700">
                    {isAdminOrLibrarian ? txn.user : "You"}
                  </td>
                  
                  {/* TYPE */}
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
                  
                  {/* AMOUNT */}
                  <td className="p-4 font-bold text-slate-900">{txn.amount}</td>
                  
                  {/* DATE */}
                  <td className="p-4 text-slate-500 text-xs">{txn.date}</td>
                  
                  {/* STATUS */}
                  <td className="p-4">
                    <div className="flex items-center justify-center">
                      {txn.status === 'Success' ? (
                        <span className="bg-emerald-50 text-emerald-600 text-xs font-bold px-2.5 py-1 rounded-md border border-emerald-100">
                          Success
                        </span>
                  ) : (
                        <span className="bg-red-50 text-red-600 text-xs font-bold px-2.5 py-1 rounded-md border border-red-100">
                          Failed
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}