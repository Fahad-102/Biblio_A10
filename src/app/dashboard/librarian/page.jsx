import React from 'react';
import Link from 'next/link';
import { PlusCircle, BookOpen, Clock, ArrowUpRight } from 'lucide-react';

export default function LibrarianHomePage() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div className="bg-linear-to-r from-violet-600 to-indigo-600 rounded-3xl p-8 text-white shadow-xl shadow-indigo-100">
        <h1 className="text-3xl font-extrabold tracking-tight">Welcome Back, Librarian! 👋</h1>
        <p className="text-indigo-100 mt-2 text-sm max-w-md">
          Manage your library inventory, track pending book requests, and review platform statistics effortlessly.
        </p>
        <div className="mt-6 flex gap-3">
          <Link href="/dashboard/librarian/books" className="btn bg-white text-indigo-600 hover:bg-indigo-50 border-0 rounded-xl font-bold px-5">
            <PlusCircle size={18} /> Add / Manage Books
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase">Total Books Managed</p>
              <h3 className="text-3xl font-black text-slate-800 mt-2">1,245</h3>
            </div>
            <span className="p-3 bg-violet-50 text-violet-600 rounded-xl"><BookOpen size={20} /></span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase">Pending Approvals</p>
              <h3 className="text-3xl font-black text-slate-800 mt-2">08</h3>
            </div>
            <span className="p-3 bg-amber-50 text-amber-600 rounded-xl"><Clock size={20} /></span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase">Issued This Month</p>
              <h3 className="text-3xl font-black text-slate-800 mt-2">142</h3>
            </div>
            <span className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><ArrowUpRight size={20} /></span>
          </div>
        </div>
      </div>
    </div>
  );
}