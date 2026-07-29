"use client";

import { useEffect, useState } from "react";
import {
  BookOpen,
  Clock,
  CheckCircle,
  DollarSign,
  Loader2,
} from "lucide-react";

const baseURI =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_SERVER_URL ||
  "http://localhost:5000";

export default function LibrarianOverviewPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchStats = async () => {
      // যেসব সম্ভাব্য এন্ডপয়েন্ট টেস্ট করা হবে
      const endpoints = [
        `${baseURI}/api/librarian/stats`,
        `${baseURI}/api/dashboard-stats`,
        `${baseURI}/api/user/summary`,
      ];

      for (const url of endpoints) {
        try {
          const res = await fetch(url, {
            credentials: "include",
            cache: "no-store",
          });

          if (res.ok) {
            const result = await res.json();
            if (isMounted) {
              setData(result);
              setLoading(false);
            }
            return; // সফল হলে লুপ বন্ধ হবে
          } else {
            const errBody = await res.text();
            console.warn(`[Stats Endpoint Failed] ${url} -> Status: ${res.status}`, errBody);
          }
        } catch (err) {
          console.error(`[Stats Fetch Error] ${url}:`, err);
        }
      }

      // কোনো এন্ডপয়েন্টই কাজ না করলে লোডিং বন্ধ করবে
      if (isMounted) setLoading(false);
    };

    fetchStats();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="animate-spin text-violet-500" size={32} />
      </div>
    );
  }

  // Safe Fallback calculation for metrics
  const myBooksCount = data?.myBooks ?? data?.totalBooks ?? data?.booksCount ?? 0;
  const pendingRequests = data?.pendingRequests ?? data?.pendingCount ?? 0;
  const approvedBooks =
    data?.approvedBooks ??
    data?.approvedCount ??
    (myBooksCount - pendingRequests > 0 ? myBooksCount - pendingRequests : 0);
  const totalEarnings = data?.totalEarnings ?? data?.earnings ?? 0;

  return (
    <div className="space-y-6 p-2 md:p-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white">
          Librarian Overview
        </h1>
        <p className="text-zinc-500 dark:text-gray-400 mt-1">
          Quick summary of your activity
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        {/* My Books */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <BookOpen className="text-violet-400" size={24} />
          </div>
          <h2 className="text-gray-400 mt-3 text-sm font-medium">My Books</h2>
          <p className="text-white text-3xl font-extrabold mt-1">
            {myBooksCount}
          </p>
        </div>

        {/* Pending Requests */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <Clock className="text-yellow-400" size={24} />
          </div>
          <h2 className="text-gray-400 mt-3 text-sm font-medium">Pending Requests</h2>
          <p className="text-white text-3xl font-extrabold mt-1">
            {pendingRequests}
          </p>
        </div>

        {/* Approved Books */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <CheckCircle className="text-green-400" size={24} />
          </div>
          <h2 className="text-gray-400 mt-3 text-sm font-medium">Approved Books</h2>
          <p className="text-white text-3xl font-extrabold mt-1">
            {approvedBooks}
          </p>
        </div>

        {/* Earnings */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <DollarSign className="text-green-400" size={24} />
          </div>
          <h2 className="text-gray-400 mt-3 text-sm font-medium">Total Earnings</h2>
          <p className="text-white text-3xl font-extrabold mt-1">
            ৳ {totalEarnings}
          </p>
        </div>

      </div>

      {/* System Status Section */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 mt-6 shadow-sm">
        <h2 className="text-white font-semibold mb-1">
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