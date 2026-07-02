"use client";

import { useEffect, useState } from "react";

const base = process.env.NEXT_PUBLIC_SERVER_URL;

export default function UserChart() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${base}/api/user/summary`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data) {
    return (
      <div className="text-white">Loading...</div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="p-4 bg-zinc-900 rounded-xl">
        <h2 className="text-gray-400">Currently Reading</h2>
        <p className="text-2xl text-white font-bold">{data.currentlyReading}</p>
      </div>

      <div className="p-4 bg-zinc-900 rounded-xl">
        <h2 className="text-gray-400">Total Borrowed</h2>
        <p className="text-2xl text-white font-bold">{data.totalBorrowed}</p>
      </div>

      <div className="p-4 bg-zinc-900 rounded-xl">
        <h2 className="text-gray-400">Wishlist</h2>
        <p className="text-2xl text-white font-bold">{data.wishlistCount}</p>
      </div>
    </div>
  );
}