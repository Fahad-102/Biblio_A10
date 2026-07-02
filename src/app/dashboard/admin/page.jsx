"use client";

import { useEffect, useState } from "react";
import {
  Users,
  BookOpen,
  Clock3,
  DollarSign,
  ArrowUpRight,
} from "lucide-react";

const base =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBooks: 0,
    pendingBooks: 0,
    totalRevenue: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const res = await fetch(`${base}/api/admin/overview`, {
        credentials: "include",
      });

      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <div className="flex h-[70vh] justify-center items-center">
        <span className="loading loading-spinner loading-lg text-purple-600"></span>
      </div>
    );
  }

  const cards = [
    {
      title: "Users",
      value: stats.totalUsers,
      icon: Users,
      color: "from-purple-700 to-violet-500",
    },
    {
      title: "Books",
      value: stats.totalBooks,
      icon: BookOpen,
      color: "from-black to-slate-800",
    },
    {
      title: "Pending",
      value: stats.pendingBooks,
      icon: Clock3,
      color: "from-red-600 to-rose-500",
    },
    {
      title: "Revenue",
      value: `৳${stats.totalRevenue}`,
      icon: DollarSign,
      color: "from-purple-900 to-black",
    },
  ];

  return (
    <div className="space-y-8">

      <div className="rounded-3xl bg-gradient-to-r from-purple-900 via-purple-700 to-black text-white p-8 shadow-xl">

        <h1 className="text-4xl font-black">
          Admin Dashboard
        </h1>

        <p className="opacity-80 mt-2">
          Manage the entire library from one place.
        </p>

      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className={`bg-gradient-to-br ${card.color}
              rounded-3xl p-6 text-white shadow-xl hover:scale-105 duration-300`}
            >
              <div className="flex justify-between">

                <div>
                  <p className="text-sm opacity-80">
                    {card.title}
                  </p>

                  <h2 className="text-4xl font-black mt-4">
                    {card.value}
                  </h2>
                </div>

                <div className="bg-white/20 h-14 w-14 rounded-2xl flex justify-center items-center">
                  <Icon size={28} />
                </div>

              </div>

              <div className="mt-8 flex items-center text-sm opacity-80">

                <ArrowUpRight size={16} />

                <span className="ml-2">
                  Live Statistics
                </span>

              </div>
            </div>
          );
        })}

      </div>

      <div className="grid lg:grid-cols-2 gap-6">

        <div className="bg-white rounded-3xl p-8 shadow-lg">

          <h2 className="font-bold text-2xl mb-6">
            Library Summary
          </h2>

          <div className="space-y-5">

            <Summary
              title="Total Users"
              value={stats.totalUsers}
            />

            <Summary
              title="Books"
              value={stats.totalBooks}
            />

            <Summary
              title="Pending Approval"
              value={stats.pendingBooks}
              color="text-red-600"
            />

            <Summary
              title="Revenue"
              value={`৳${stats.totalRevenue}`}
              color="text-purple-700"
            />

          </div>

        </div>

        <div className="rounded-3xl bg-gradient-to-br from-black via-purple-950 to-red-700 text-white p-8 shadow-xl">

          <h2 className="text-3xl font-black">
            Welcome Back 👋
          </h2>

          <p className="mt-5 opacity-80 leading-8">

            Monitor users, books, payments,
            pending approvals and transactions
            from this control panel.

          </p>

        </div>

      </div>

    </div>
  );
}

function Summary({
  title,
  value,
  color = "text-black",
}) {
  return (
    <div className="flex justify-between border-b pb-4">

      <p className="text-gray-500">
        {title}
      </p>

      <p className={`font-bold ${color}`}>
        {value}
      </p>

    </div>
  );
}