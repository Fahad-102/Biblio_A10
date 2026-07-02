"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Book, Compass, History, Bookmark } from 'lucide-react';

export default function UserHomePage() {
  const [summary, setSummary] = useState({ currentlyReading: 0, totalBorrowed: 0, wishlistCount: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    fetch(`${API_URL}/api/user/summary`, { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        setSummary(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch Error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-10 text-center">Loading your dashboard...</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="bg-linear-to-r from-slate-900 to-slate-800 rounded-3xl p-8 text-white shadow-xl">
        <h1 className="text-3xl font-extrabold tracking-tight">Happy Reading! 📚</h1>
        <p className="text-slate-300 mt-2 text-sm max-w-md">
          Explore thousands of free and premium books. Track your borrowing window and reading progress directly from here.
        </p>
        <div className="mt-6 flex gap-3">
          <Link href="/dashboard/user/books" className="btn bg-indigo-600 text-white hover:bg-indigo-700 border-0 rounded-xl font-bold px-5">
            <Compass size={18} /> Browse Book Directory
          </Link>
        </div>
      </div>

      {/* Dynamic Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Currently Reading" value={`${summary.currentlyReading} Books`} icon={Book} color="text-blue-600" bgColor="bg-blue-50" />
        <StatCard title="Total Borrowed History" value={`${summary.totalBorrowed} Books`} icon={History} color="text-purple-600" bgColor="bg-purple-50" />
        <StatCard title="Saved in Wishlist" value={`${summary.wishlistCount} Books`} icon={Bookmark} color="text-rose-600" bgColor="bg-rose-50" />
      </div>
    </div>
  );
}

// Helper Component
function StatCard({ title, value, icon: Icon, color, bgColor }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4">
      <div className={`p-3 ${bgColor} ${color} rounded-xl`}><Icon size={22} /></div>
      <div>
        <h4 className="text-2xl font-bold text-slate-800">{value}</h4>
        <p className="text-slate-400 text-xs font-semibold uppercase mt-0.5">{title}</p>
      </div>
    </div>
  );
}