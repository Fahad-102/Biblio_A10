"use client";
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';
import { BookOpen, DollarSign, Clock, Users, CreditCard } from 'lucide-react';

export default function DashboardOverview({ role }) {
  const statsConfig = {
    librarian: [
      { title: "Books Listed", value: "32", icon: BookOpen, color: "text-violet-600" },
      { title: "Pending Orders", value: "5", icon: Clock, color: "text-amber-500" },
      { title: "Total Revenue", value: "$420.00", icon: DollarSign, color: "text-emerald-600" },
    ],
    user: [
      { title: "Books Borrowed", value: "12", icon: BookOpen, color: "text-indigo-600" },
      { title: "Active Deliveries", value: "2", icon: Clock, color: "text-amber-500" },
      { title: "Total Spent", value: "$65.00", icon: DollarSign, color: "text-emerald-600" },
    ],
    user_pro: [
      { title: "Books Borrowed (Pro)", value: "28", icon: BookOpen, color: "text-indigo-600" },
      { title: "Active Deliveries", value: "1", icon: Clock, color: "text-amber-500" },
      { title: "Total Spent", value: "$145.00", icon: DollarSign, color: "text-emerald-600" },
    ],
    admin: [
      { title: "Total Members", value: "1,420", icon: Users, color: "text-blue-600" },
      { title: "Global Inventory", value: "890 Books", icon: BookOpen, color: "text-violet-600" },
      { title: "Platform Traffic", value: "94%", icon: Clock, color: "text-amber-500" },
      { title: "Total Net Revenue", value: "$5,840", icon: DollarSign, color: "text-emerald-600" },
    ]
  };

  const data = [
    { name: 'Jan', value: 240 },
    { name: 'Feb', value: 360 },
    { name: 'Mar', value: 500 },
    { name: 'Apr', value: 720 },
    { name: 'May', value: 600 },
    { name: 'Jun', value: 850 },
  ];

  const currentStats = statsConfig[role] || statsConfig.user;

  return (
    <div className="p-6 space-y-8 w-full max-w-7xl mx-auto">
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {currentStats.slice(0, 3).map((stat, idx) => {
          const IconComponent = stat.icon;
          return (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-2 text-slate-800 tracking-tight">{stat.value}</h3>
              </div>
              <div className={`p-3 rounded-xl bg-slate-50 ${stat.color}`}>
                <IconComponent size={22} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs">
          <h4 className="font-bold text-slate-800 text-sm mb-6 uppercase tracking-wider">Activity Overview</h4>
          <div className="h-70">
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
        
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs">
          <h4 className="font-bold text-slate-800 text-sm mb-6 uppercase tracking-wider">Analytics & Trends</h4>
          <div className="h-70">
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