"use client";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Loader2 } from "lucide-react";
import { useSession } from "@/app/lib/auth-client";

const COLORS = ["#7c3aed", "#f59e0b", "#10b981", "#ef4444", "#3b82f6", "#ec4899"];

export default function AdminChartPage() {
  const { data: session, isPending } = useSession();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // ফেচ করার সময় সঠিক রিকোয়েটিংস অপশন বা হেডারস স্বয়ংক্রিয়ভাবে কুকি পাস করবে
    fetch("/api/admin/chart", {
      credentials: "include"
    })
      .then(async (res) => {
        if (!res.ok) {
          throw { status: res.status };
        }
        return res.json();
      })
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(
          err.status === 401
            ? "Unauthorized. Please log in as admin."
            : "Failed to load chart data."
        );
        setLoading(false);
      });
  }, []);

  if (isPending || loading)
    return (
      <div className="flex justify-center items-center h-80">
        <Loader2 className="animate-spin text-purple-600" size={32} />
      </div>
    );

  if (error)
    return <div className="p-8 text-center text-red-500 font-medium">{error}</div>;

  if (!stats)
    return <div className="p-8 text-center text-slate-500 font-medium">No data available.</div>;

  const categoryData = stats.categoryStats || [];

  return (
    <div className="space-y-6 p-2 md:p-6 max-w-7xl mx-auto">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black text-slate-800 tracking-tight">
          Admin Analytics & Charts
        </h1>
        <p className="text-sm text-slate-500">
          Visual breakdown of books distribution across categories.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100">
          <h3 className="text-xl font-bold mb-4 text-slate-700">Books by Category</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} margin={{ top: 10, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="_id" tick={{ fill: "#64748b", fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#7c3aed" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100">
          <h3 className="text-xl font-bold mb-4 text-slate-700">Category Distribution</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="count"
                  nameKey="_id"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  innerRadius={45}
                  label
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}