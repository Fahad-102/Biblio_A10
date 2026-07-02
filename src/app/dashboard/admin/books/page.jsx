"use client";

import { useEffect, useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  XCircle,
  Trash2,
} from "lucide-react";

const base = process.env.NEXT_PUBLIC_SERVER_URL;

export default function AdminBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBooks = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${base}/api/admin/books`, {
        credentials: "include",
      });

      const data = await res.json();

      console.log("API RESPONSE:", data);

      // ✅ SAFE FIX (always array)
      setBooks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log(err);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const updateStatus = async (id, action) => {
    await fetch(`${base}/api/admin/books/${action}/${id}`, {
      method: "PATCH",
      credentials: "include",
    });

    loadBooks();
  };

  const deleteBook = async (id) => {
    const ok = confirm("Delete this book?");
    if (!ok) return;

    await fetch(`${base}/api/admin/books/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    loadBooks();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="bg-white border rounded-2xl shadow-sm p-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Book Management</h1>
          <p className="text-gray-500">Approve / Reject / Delete books</p>
        </div>

        <BookOpen size={30} />
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded-2xl overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>

            {books.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center p-10 text-gray-500">
                  No books found in database
                </td>
              </tr>
            ) : (
              books.map((book) => (
                <tr key={book._id} className="border-t">

                  <td className="p-4 font-medium">
                    {book.title}
                  </td>

                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold
                      ${book.status === "Published"
                        ? "bg-green-100 text-green-700"
                        : book.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                      }`}>
                      {book.status}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex gap-2 justify-center">

                      <button
                        onClick={() => updateStatus(book._id, "approve")}
                        className="bg-green-600 text-white px-3 py-1 rounded"
                      >
                        <CheckCircle2 size={16} />
                      </button>

                      <button
                        onClick={() => updateStatus(book._id, "reject")}
                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        <XCircle size={16} />
                      </button>

                      <button
                        onClick={() => deleteBook(book._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        <Trash2 size={16} />
                      </button>

                    </div>
                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>
    </div>
  );
}