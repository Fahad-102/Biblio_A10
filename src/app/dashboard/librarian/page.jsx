"use client"; 

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { PlusCircle, BookOpen, Clock, CheckCircle, DollarSign } from 'lucide-react';
import { getDashboardStats } from '@/app/lib/api/books';

export default function LibrarianHomePage() {
  const [stats, setStats] = useState({ 
    myBooks: 0, 
    pendingRequests: 0, 
    approvedBooks: 0,
    totalEarnings: 0 
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        const data = await getDashboardStats(); 
        if (data && isMounted) {
          const myBooks = data?.myBooks ?? data?.publishedBooks ?? data?.totalBooks ?? 0;
          const pendingRequests = data?.pendingRequests ?? data?.totalRequests ?? data?.pendingCount ?? 0;
          const approvedBooks = data?.approvedBooks ?? data?.approvedCount ?? (myBooks - pendingRequests > 0 ? myBooks - pendingRequests : 0);
          const totalEarnings = data?.totalEarnings ?? data?.earnings ?? 0;

          setStats({
            myBooks,
            pendingRequests,
            approvedBooks,
            totalEarnings,
          });
        }
      } catch (error) {
        console.error("Error fetching dashboard stats via getDashboardStats():", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-violet-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-3xl p-6 md:p-8 text-white shadow-xl shadow-indigo-100">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Welcome Back, Librarian! 👋</h1>
        <p className="text-indigo-100 mt-2 text-sm max-w-md">
          Manage your library inventory, track pending book requests, and review platform statistics effortlessly.
        </p>
        <div className="mt-6">
          <Link 
            href="/dashboard/librarian/books" 
            className="inline-flex items-center gap-2 bg-white text-indigo-600 hover:bg-indigo-50 px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm text-sm"
          >
            <PlusCircle size={18} /> Add / Manage Books
          </Link>
        </div>
      </div>

      {/* Stats Grid (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard title="My Books" value={stats.myBooks} icon={<BookOpen size={20} />} color="violet" />
        <StatCard title="Pending Requests" value={stats.pendingRequests} icon={<Clock size={20} />} color="amber" />
        <StatCard title="Approved Books" value={stats.approvedBooks} icon={<CheckCircle size={20} />} color="emerald" />
        <StatCard title="Total Earnings" value={`৳ ${stats.totalEarnings}`} icon={<DollarSign size={20} />} color="indigo" />
      </div>

      {/* System Status */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <h2 className="text-slate-800 font-bold mb-1">System Status</h2>
        <p className="text-slate-500 text-sm">
          All services are running normally. Your library system is active and handling requests without issues.
        </p>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  const colorMap = {
    violet: "bg-violet-50 text-violet-600",
    amber: "bg-amber-50 text-amber-600",
    emerald: "bg-emerald-50 text-emerald-600",
    indigo: "bg-indigo-50 text-indigo-600",
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{title}</p>
          <h3 className="text-2xl md:text-3xl font-black text-slate-800 mt-2">{value}</h3>
        </div>
        <span className={`p-3 rounded-xl ${colorMap[color]}`}>{icon}</span>
      </div>
    </div>
  );
}