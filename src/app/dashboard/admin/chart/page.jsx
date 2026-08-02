"use client";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, Legend } from "recharts";
import { apiFetch } from "@/lib/api";
import { Loader2 } from "lucide-react";

const COLORS = ["#7c3aed", "#f59e0b", "#10b981", "#ef4444", "#3b82f6", "#ec4899"];

export default function AdminChartPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiFetch("/api/admin/chart")
      .then((data) => { setStats(data); setLoading(false); })
      .catch((err) => {
        setError(err.status === 401 ? "Unauthorized. Please log in again." : "Failed to load chart data.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" size={28} /></div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!stats) return <div className="p-8 text-center text-red-500">No data available.</div>;

  return (
    <div className="space-y-6 p-2 md:p-6">
      <h1 className="text-3xl font-bold text-slate-800">Admin Analytics & Charts</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-lg border">
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
        <div className="bg-white p-6 rounded-3xl shadow-lg border">
          <h3 className="text-xl font-bold mb-4 text-slate-700">Category Distribution</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={stats.categoryStats || []} dataKey="count" nameKey="_id" cx="50%" cy="50%" outerRadius={100} label>
                  {(stats.categoryStats || []).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}