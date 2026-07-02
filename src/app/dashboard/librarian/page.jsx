"use client"; 
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { PlusCircle, BookOpen, Clock, DollarSign } from 'lucide-react';
import { getDashboardStats } from '@/app/lib/api/books';


export default function LibrarianHomePage() {
  const [stats, setStats] = useState({ myBooks: 0, pendingRequests: 0, totalEarnings: 0 });
  const [loading, setLoading] = useState(true);

useEffect(() => {
  async function fetchData() {
    try {
      const data = await getDashboardStats(); 
      if (data) setStats(data);
      
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  }
  fetchData();
}, []);

  if (loading) return <div className="p-10 text-center">Loading Dashboard...</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Welcome Section */}
      <div className="bg-linear-to-r from-violet-600 to-indigo-600 rounded-3xl p-8 text-white shadow-xl shadow-indigo-100">
        <h1 className="text-3xl font-extrabold tracking-tight">Welcome Back, Librarian! 👋</h1>
        <p className="text-indigo-100 mt-2 text-sm max-w-md">
          Manage your library inventory, track pending book requests, and review platform statistics effortlessly.
        </p>
        <div className="mt-6">
          <Link 
            href="/dashboard/librarian/books" 
            className="inline-flex items-center gap-2 bg-white text-indigo-600 hover:bg-indigo-50 px-5 py-2.5 rounded-xl font-bold transition-all"
          >
            <PlusCircle size={18} /> Add / Manage Books
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="My Books" value={stats.myBooks} icon={<BookOpen size={20} />} color="violet" />
        <StatCard title="Pending Requests" value={stats.pendingRequests} icon={<Clock size={20} />} color="amber" />
        <StatCard title="Total Earnings" value={`$${stats.totalEarnings}`} icon={<DollarSign size={20} />} color="emerald" />
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  const colorMap = {
    violet: "bg-violet-50 text-violet-600",
    amber: "bg-amber-50 text-amber-600",
    emerald: "bg-emerald-50 text-emerald-600"
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{title}</p>
          <h3 className="text-3xl font-black text-slate-800 mt-2">{value}</h3>
        </div>
        <span className={`p-3 rounded-xl ${colorMap[color]}`}>{icon}</span>
      </div>
    </div>
  );
}