"use client";

import { useEffect, useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  Clock3,
  Package,
} from "lucide-react";

const base = process.env.NEXT_PUBLIC_SERVER_URL;

export default function LibrarianHome() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch(`${base}/api/librarian/overview`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then(setStats)
      .catch(console.error);
  }, []);

  if (!stats) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const cards = [
    {
      title: "My Books",
      value: stats.myBooks,
      icon: BookOpen,
      color: "from-violet-600 to-purple-700",
    },
    {
      title: "Published",
      value: stats.publishedBooks,
      icon: CheckCircle2,
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Pending",
      value: stats.pendingBooks,
      icon: Clock3,
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Requests",
      value: stats.totalRequests,
      icon: Package,
      color: "from-sky-500 to-blue-600",
    },
  ];

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold text-white">
          Librarian Dashboard
        </h1>

        <p className="text-gray-400 mt-2">
          Welcome back 👋 Manage your books and delivery requests.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6 hover:border-violet-500 duration-300"
            >
              <div className="flex justify-between items-center">

                <div>
                  <p className="text-gray-400 text-sm">
                    {card.title}
                  </p>

                  <h2 className="text-4xl font-bold text-white mt-3">
                    {card.value}
                  </h2>
                </div>

                <div
                  className={`bg-gradient-to-r ${card.color} p-4 rounded-xl shadow-lg`}
                >
                  <Icon className="text-white" size={28} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            Library Summary
          </h2>

          <div className="space-y-3 text-gray-300">

            <div className="flex justify-between">
              <span>Total Books</span>
              <span className="font-bold text-violet-400">
                {stats.myBooks}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Published</span>
              <span className="font-bold text-green-400">
                {stats.publishedBooks}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Pending Approval</span>
              <span className="font-bold text-orange-400">
                {stats.pendingBooks}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Delivery Requests</span>
              <span className="font-bold text-sky-400">
                {stats.totalRequests}
              </span>
            </div>

          </div>
        </div>

        <div className="bg-gradient-to-r from-violet-700 via-purple-700 to-fuchsia-700 rounded-2xl p-8 text-white">

          <h2 className="text-2xl font-bold">
            Keep Growing 📚
          </h2>

          <p className="mt-4 text-white/90 leading-7">
            Publish quality books, respond to delivery requests quickly,
            and maintain a great library experience for readers.
          </p>

          <button className="mt-8 px-5 py-3 rounded-xl bg-white text-black font-semibold hover:scale-105 duration-300">
            Manage Books
          </button>

        </div>

      </div>

    </div>
  );
}