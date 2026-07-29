"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Book, Compass, History, Bookmark } from "lucide-react";

export default function UserHomePage() {
  const [summary, setSummary] = useState({
    currentlyReading: 0,
    totalBorrowed: 0,
    wishlistCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🔥 Port 5000-এর ঝামেলা এড়াতে সরাসরি Relative URL ব্যবহার করা হয়েছে
    fetch("/api/user/summary", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        // HTML error response বা 404/500 এলে হ্যান্ডেল করা
        if (!res.ok) {
          throw new Error(`HTTP Error Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setSummary({
          currentlyReading: data?.currentlyReading || 0,
          totalBorrowed: data?.totalBorrowed || 0,
          wishlistCount: data?.wishlistCount || 0,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        // এরর হলেও পেজ ক্র্যাশ না করে ডিফল্ট মান নিয়ে লোডার বন্ধ করা
        setSummary({
          currentlyReading: 0,
          totalBorrowed: 0,
          wishlistCount: 0,
        });
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="p-10 text-center text-slate-500 font-medium">
        Loading your dashboard...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 text-white shadow-xl">
        <h1 className="text-3xl font-extrabold tracking-tight">
          Happy Reading! 📚
        </h1>
        <p className="text-slate-300 mt-2 text-sm max-w-md">
          Explore thousands of free and premium books. Track your borrowing
          window and reading progress directly from here.
        </p>
        <div className="mt-6 flex gap-3">
          <Link
            href="/dashboard/user/books"
            className="bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl font-bold px-5 py-2.5 inline-flex items-center gap-2 transition-colors"
          >
            <Compass size={18} /> Browse Book Directory
          </Link>
        </div>
      </div>

      {/* Dynamic Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Currently Reading"
          value={`${summary.currentlyReading} Books`}
          icon={Book}
          color="text-blue-600"
          bgColor="bg-blue-50"
        />
        <StatCard
          title="Total Borrowed History"
          value={`${summary.totalBorrowed} Books`}
          icon={History}
          color="text-purple-600"
          bgColor="bg-purple-50"
        />
        <StatCard
          title="Saved in Wishlist"
          value={`${summary.wishlistCount} Books`}
          icon={Bookmark}
          color="text-rose-600"
          bgColor="bg-rose-50"
        />
      </div>
    </div>
  );
}

// Helper Component
function StatCard({ title, value, icon: Icon, color, bgColor }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
      <div className={`p-3 ${bgColor} ${color} rounded-xl`}>
        <Icon size={22} />
      </div>
      <div>
        <h4 className="text-2xl font-bold text-slate-800">{value}</h4>
        <p className="text-slate-400 text-xs font-semibold uppercase mt-0.5">
          {title}
        </p>
      </div>
    </div>
  );
}