"use client";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { apiFetch } from "@/lib/api";
import { Loader2 } from "lucide-react";

export default function LibrarianChartPage() {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiFetch("/api/librarian/overview")
      .then((data) => { setOverview(data); setLoading(false); })
      .catch((err) => {
        setError(err.status === 401 ? "Unauthorized. Please log in again." : "Failed to load chart data.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" size={28} /></div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  const chartData = [
    { name: "My Books", value: overview?.myBooks ?? 0 },
    { name: "Published", value: overview?.publishedBooks ?? 0 },
    { name: "Pending", value: overview?.pendingBooks ?? 0 },
    { name: "Requests", value: overview?.totalRequests ?? 0 },
  ];

  return (
    <div className="p-2 md:p-6 space-y-4">
      <h1 className="text-2xl font-bold text-slate-800">Librarian Analytics</h1>
      <div className="bg-white p-6 rounded-3xl shadow-lg border">
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#7c3aed" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}