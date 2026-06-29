import React from 'react';
import Link from 'next/link';
import { Users, Settings, ShieldAlert, DollarSign } from 'lucide-react';

export default function AdminHomePage() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div className="bg-linear-to-r from-red-600 to-rose-600 rounded-3xl p-8 text-white shadow-xl shadow-rose-100">
        <h1 className="text-3xl font-extrabold tracking-tight">System Control Panel 🛡️</h1>
        <p className="text-rose-100 mt-2 text-sm max-w-md">
          Platform overseer portal. Monitor user signups, manage server-wide database inventory, and approve premium publisher tiers.
        </p>
        <div className="mt-6 flex gap-3">
          <Link href="/dashboard/admin/userManage" className="btn bg-white text-red-600 hover:bg-rose-50 border-0 rounded-xl font-bold px-5">
            <Users size={18} /> Manage Platform Users
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase">Total Platform Users</p>
              <h3 className="text-3xl font-black text-slate-800 mt-2">4,892</h3>
            </div>
            <span className="p-3 bg-red-50 text-red-600 rounded-xl"><Users size={20} /></span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase">Global Revenue</p>
              <h3 className="text-3xl font-black text-slate-800 mt-2">$14,240</h3>
            </div>
            <span className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><DollarSign size={20} /></span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase">System Alerts</p>
              <h3 className="text-3xl font-black text-slate-800 mt-2">0</h3>
            </div>
            <span className="p-3 bg-slate-50 text-slate-600 rounded-xl"><ShieldAlert size={20} /></span>
          </div>
        </div>
      </div>
    </div>
  );
}