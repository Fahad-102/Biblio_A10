"use client";

import { useEffect, useState } from "react";
import {
  BookOpen,
  Clock,
  CheckCircle,
  DollarSign,
  Loader2,
} from "lucide-react";

const base = process.env.NEXT_PUBLIC_SERVER_URL;

export default function LibrarianOverviewPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${base}/api/dashboard-stats`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="animate-spin text-violet-500" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-2 md:p-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Librarian Overview
        </h1>
        <p className="text-gray-400 mt-1">
          Quick summary of your activity
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        {/* My Books */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <BookOpen className="text-violet-400" />
          </div>
          <h2 className="text-gray-400 mt-3 text-sm">My Books</h2>
          <p className="text-white text-2xl font-bold">
            {data?.myBooks || 0}
          </p>
        </div>

        {/* Pending Requests */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <Clock className="text-yellow-400" />
          </div>
          <h2 className="text-gray-400 mt-3 text-sm">Pending Requests</h2>
          <p className="text-white text-2xl font-bold">
            {data?.pendingRequests || 0}
          </p>
        </div>

        {/* Approved Books */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <CheckCircle className="text-green-400" />
          </div>
          <h2 className="text-gray-400 mt-3 text-sm">Approved Books</h2>
          <p className="text-white text-2xl font-bold">
            {(data?.myBooks || 0) - (data?.pendingRequests || 0)}
          </p>
        </div>

        {/* Earnings */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <DollarSign className="text-green-400" />
          </div>
          <h2 className="text-gray-400 mt-3 text-sm">Total Earnings</h2>
          <p className="text-white text-2xl font-bold">
            ৳ {data?.totalEarnings || 0}
          </p>
        </div>

      </div>

      {/* Extra Info Section */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 mt-6">
        <h2 className="text-white font-semibold mb-2">
          System Status
        </h2>

        <p className="text-gray-400 text-sm">
          All services are running normally. Your library system is active and
          handling requests without issues.
        </p>
      </div>

    </div>
  );
}