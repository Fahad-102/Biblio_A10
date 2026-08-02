"use client";

import { useEffect, useState } from "react";
import {
  BookOpen,
  Clock,
  CheckCircle,
  DollarSign,
  Loader2,
  AlertTriangle,
} from "lucide-react";

const baseURI =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_SERVER_URL ||
  "http://localhost:5000";

export default function LibrarianOverviewPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchStats = async () => {
      try {
        const res = await fetch(`${baseURI}/api/librarian/stats`, {
          credentials: "include",
          cache: "no-store",
        });

        if (!res.ok) {
          const errBody = await res.text().catch(() => "");
          console.error(`[Librarian Stats Failed] Status: ${res.status}`, errBody);

          if (isMounted) {
            if (res.status === 401) {
              setError("Session expired or unauthorized. Please log in again.");
            } else if (res.status === 403) {
              setError("You don't have permission to view this data.");
            } else {
              setError(`Failed to load stats (status ${res.status}).`);
            }
            setLoading(false);
          }
          return;
        }

        const result = await res.json();
        if (isMounted) {
          setData(result);
          setLoading(false);
        }
      } catch (err) {
        console.error("[Librarian Stats Fetch Error]:", err);
        if (isMounted) {
          setError("Network error — could not reach the server.");
          setLoading(false);
        }
      }
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

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center gap-3">
        <AlertTriangle className="text-red-400" size={32} />
        <p className="text-red-400 font-medium">{error}</p>
      </div>
    );
  }

  const myBooksCount = data?.myBooks ?? 0;
  const pendingRequests = data?.pendingRequests ?? 0;
  const approvedBooks = data?.approvedBooks ?? 0;
  const totalEarnings = data?.totalEarnings ?? 0;

  return (
    <div className="space-y-6 p-2 md:p-6">

      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white">
          Librarian Overview
        </h1>
        <p className="text-zinc-500 dark:text-gray-400 mt-1">
          Quick summary of your activity
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <BookOpen className="text-violet-400" size={24} />
          </div>
          <h2 className="text-gray-400 mt-3 text-sm font-medium">My Books</h2>
          <p className="text-white text-3xl font-extrabold mt-1">
            {myBooksCount}
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <Clock className="text-yellow-400" size={24} />
          </div>
          <h2 className="text-gray-400 mt-3 text-sm font-medium">Pending Requests</h2>
          <p className="text-white text-3xl font-extrabold mt-1">
            {pendingRequests}
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <CheckCircle className="text-green-400" size={24} />
          </div>
          <h2 className="text-gray-400 mt-3 text-sm font-medium">Approved Books</h2>
          <p className="text-white text-3xl font-extrabold mt-1">
            {approvedBooks}
          </p>
        </div>

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