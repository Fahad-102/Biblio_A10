"use client";

import { useEffect, useState } from "react";

const base = process.env.NEXT_PUBLIC_SERVER_URL;

export default function UserBooksPage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch(`${base}/api/user/borrowed-books`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then(setBooks);
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">My Borrowed Books</h1>

      {books.length === 0 ? (
        <p className="text-gray-400">No books found</p>
      ) : (
        <div className="grid gap-3">
          {books.map((book) => (
            <div
              key={book._id}
              className="p-4 bg-zinc-900 rounded-xl"
            >
              <h2 className="font-semibold">{book.title}</h2>
              <p className="text-sm text-gray-400">
                Status: {book.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}