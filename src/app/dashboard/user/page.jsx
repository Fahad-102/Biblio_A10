import React from 'react';
import Link from 'next/link';
import { Book, Compass, History, Bookmark } from 'lucide-react';

export default function UserHomePage() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div className="bg-linear-to-r from-slate-900 to-slate-800 rounded-3xl p-8 text-white shadow-xl shadow-slate-100">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Book size={22} /></div>
          <div>
            <h4 className="text-2xl font-bold text-slate-800">4 Books</h4>
            <p className="text-slate-400 text-xs font-semibold uppercase mt-0.5">Currently Reading</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl"><History size={22} /></div>
          <div>
            <h4 className="text-2xl font-bold text-slate-800">23 Books</h4>
            <p className="text-slate-400 text-xs font-semibold uppercase mt-0.5">Total Borrowed History</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-rose-50 text-rose-600 rounded-xl"><Bookmark size={22} /></div>
          <div>
            <h4 className="text-2xl font-bold text-slate-800">12 Books</h4>
            <p className="text-slate-400 text-xs font-semibold uppercase mt-0.5">Saved in Wishlist</p>
          </div>
        </div>
      </div>
    </div>
  );
}