"use client";

import { useEffect, useState } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid 
} from "recharts";

const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function AdminChart() {
  const [session, setSession] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ১. প্রথমে সেশন চেক করা
    fetch(`${base}/api/auth/get-session`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((sessionData) => {
        setSession(sessionData);
        
        // ২. সেশন পাওয়ার পর অ্যাডমিন ওভারভিউ বা চার্টের ডেটা ফেচ করা
        return fetch(`${base}/api/admin/overview`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
      })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch statistics");
        return res.json();
      })
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading admin chart page:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-8 text-center">Loading Analytics...</div>;
  if (!session || !session.user) return <div className="p-8 text-center text-red-500">Unauthorized Access. Please login.</div>;
  if (!stats) return <div className="p-8 text-center text-red-500">Failed to load chart data.</div>;

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 md:p-6">
      <h1 className="text-3xl font-bold tracking-tight text-slate-800">Admin Analytics & Charts</h1>
      
      {/* Category Stats Bar Chart */}
      <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100">
        <h3 className="text-xl font-bold mb-4 text-slate-700">Books by Category</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.categoryStats || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#7c3aed" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}