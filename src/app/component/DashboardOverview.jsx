"use client";
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';
import { BookOpen, DollarSign, Clock, Users } from 'lucide-react';

export default function DashboardOverview({ role, token }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log("Checking Token before fetch:", token);

useEffect(() => {
  if (!token) return; 

  const API_BASE_URL = process.env.NODE_ENV === 'production' 
    ? "https://biblio-server-a10.vercel.app" 
    : "http://localhost:5000";

  console.log("Sending Request with Token:", token); 

 
fetch(`${API_BASE_URL}/api/dashboard-stats`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json"
  },
  credentials: "include" 
})
  .then(res => {
    if (!res.ok) throw new Error(`Status: ${res.status}`);
    return res.json();
  })
  .then(data => {
    setStats(data);
    setLoading(false);
  })
  .catch(err => {
    console.error("Fetch Error:", err);
    setLoading(false);
  });
}, [token]);

  if (loading) return <div className="p-10 text-center">Loading Dashboard...</div>;
  if (!stats) return <div className="p-10 text-center">Failed to load statistics.</div>;

  const getDisplayStats = () => {
    if (role === 'admin') return [
      { title: "Total Users", value: stats.totalUsers || 0, icon: Users, color: "text-blue-600" },
      { title: "Total Books", value: stats.totalBooks || 0, icon: BookOpen, color: "text-violet-600" },
      { title: "Pending Approval", value: stats.pendingBooks || 0, icon: Clock, color: "text-amber-500" }
    ];
    if (role === 'librarian') return [
      { title: "My Books", value: stats.myBooks || 0, icon: BookOpen, color: "text-violet-600" },
      { title: "Pending Requests", value: stats.pendingRequests || 0, icon: Clock, color: "text-amber-500" },
      { title: "Total Earnings", value: `$${stats.totalEarnings || 0}`, icon: DollarSign, color: "text-emerald-600" }
    ];
    return [
      { title: "Books Borrowed", value: stats.totalBorrowed || 0, icon: BookOpen, color: "text-indigo-600" },
      { title: "Total Spent", value: `$${stats.totalSpent || 0}`, icon: DollarSign, color: "text-emerald-600" }
    ];
  };

  const data = [
    { name: 'Jan', value: 240 },
    { name: 'Feb', value: 360 },
    { name: 'Mar', value: 500 },
    { name: 'Apr', value: 720 },
    { name: 'May', value: 600 },
    { name: 'Jun', value: 850 },
  ];

  return (
    <div className="p-6 space-y-8 w-full max-w-7xl mx-auto">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {getDisplayStats().map((stat, idx) => {
          const IconComponent = stat.icon;
          return (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-2 text-slate-800">{stat.value}</h3>
              </div>
              <div className={`p-3 rounded-xl bg-slate-50 ${stat.color}`}>
                <IconComponent size={22} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h4 className="font-bold text-slate-800 text-sm mb-6 uppercase tracking-wider">Activity Overview</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: '#f8fafc' }} />
                <Bar dataKey="value" fill="#4f46e5" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h4 className="font-bold text-slate-800 text-sm mb-6 uppercase tracking-wider">Analytics & Trends</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}