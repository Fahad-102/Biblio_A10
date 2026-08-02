"use client";
import { useEffect, useState } from "react";
import { Users, BookOpen, Clock3, DollarSign, ArrowUpRight } from "lucide-react";
import { apiFetch } from "@/lib/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalUsers: 0, totalBooks: 0, pendingBooks: 0, totalRevenue: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await apiFetch("/api/admin/chart");
        setStats({
          totalUsers: data?.totalUsers || 0,
          totalBooks: data?.totalBooks || 0,
          pendingBooks: data?.pendingBooks || 0,
          totalRevenue: data?.totalRevenue || 0,
        });
      } catch (err) {
        console.error("Admin Overview Fetch Error:", err);
        setError(err.status === 401 ? "Unauthorized. Please log in again." : "Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <div className="flex h-[70vh] justify-center items-center"><div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-600 border-t-transparent"></div></div>;
  if (error) return <div className="flex h-[70vh] justify-center items-center"><p className="text-red-500 font-medium">{error}</p></div>;

  const cards = [
    { title: "Users", value: stats.totalUsers, icon: Users, color: "from-purple-700 to-violet-500" },
    { title: "Books", value: stats.totalBooks, icon: BookOpen, color: "from-slate-900 to-slate-800" },
    { title: "Pending", value: stats.pendingBooks, icon: Clock3, color: "from-red-600 to-rose-500" },
    { title: "Revenue", value: `৳${stats.totalRevenue}`, icon: DollarSign, color: "from-purple-950 to-slate-900" },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto p-2 md:p-6">
      <div className="rounded-3xl bg-gradient-to-r from-purple-900 via-purple-700 to-slate-950 text-white p-8 shadow-xl">
        <h1 className="text-4xl font-black tracking-tight">Admin Dashboard</h1>
        <p className="opacity-80 mt-2 text-sm md:text-base">Manage the entire library ecosystem from one central panel.</p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className={`bg-gradient-to-br ${card.color} rounded-3xl p-6 text-white shadow-xl hover:scale-[1.02] transition-transform duration-300`}>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm opacity-80 font-medium">{card.title}</p>
                  <h2 className="text-4xl font-black mt-4">{card.value}</h2>
                </div>
                <div className="bg-white/20 h-14 w-14 rounded-2xl flex justify-center items-center backdrop-blur-sm">
                  <Icon size={28} />
                </div>
              </div>
              <div className="mt-8 flex items-center text-sm opacity-80">
                <ArrowUpRight size={16} />
                <span className="ml-2">Live Statistics</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
          <h2 className="font-bold text-2xl mb-6 text-slate-800">Library Summary</h2>
          <div className="space-y-5">
            <Summary title="Total Users" value={stats.totalUsers} />
            <Summary title="Books" value={stats.totalBooks} />
            <Summary title="Pending Approval" value={stats.pendingBooks} color="text-red-600" />
            <Summary title="Revenue" value={`৳${stats.totalRevenue}`} color="text-purple-700" />
          </div>
        </div>
        <div className="rounded-3xl bg-gradient-to-br from-slate-950 via-purple-950 to-red-700 text-white p-8 shadow-xl flex flex-col justify-center">
          <h2 className="text-3xl font-black">Welcome Back 👋</h2>
          <p className="mt-5 opacity-80 leading-8 text-slate-200">Monitor users, books, payments, pending approvals, and overall platform transactions seamlessly.</p>
        </div>
      </div>
    </div>
  );
}

function Summary({ title, value, color = "text-slate-900" }) {
  return (
    <div className="flex justify-between border-b border-slate-100 pb-4 items-center">
      <p className="text-slate-500 font-medium text-sm">{title}</p>
      <p className={`font-bold ${color}`}>{value}</p>
    </div>
  );
}