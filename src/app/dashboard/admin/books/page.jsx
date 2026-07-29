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
      setBooks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const updateStatus = async (id, action) => {
    try {
      const res = await fetch(`${base}/api/admin/books/${action}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (res.ok) {
        await loadBooks();
      } else {
        const errData = await res.json();
        alert(errData.error || errData.msg || "Failed to update status");
      }
    } catch (error) {
      console.error("Status update error:", error);
    }
  };

  const deleteBook = async (id) => {
    const ok = confirm("Delete this book?");
    if (!ok) return;

    try {
      const res = await fetch(`${base}/api/admin/books/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        await loadBooks();
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
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
          <h1 className="text-3xl text-purple-700 font-bold">Book Management</h1>
          <p className="text-gray-500">Approve / Reject / Delete books</p>
        </div>

        <BookOpen size={30} className="text-purple-700" />
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
              books.map((book) => {
                const status = book.status || "Pending Approval";
                const isApproved = status === "Approved" || status === "Published";
                const isPending = status.includes("Pending");

                return (
                  <tr key={book._id} className="border-t hover:bg-gray-50">

                    <td className="p-4 font-medium">
                      {book.title}
                    </td>

                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        isApproved
                          ? "bg-green-100 text-green-700"
                          : isPending
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}>
                        {status}
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="flex gap-2 justify-center">

                        <button
                          onClick={() => updateStatus(book._id, "approve")}
                          title="Approve Book"
                          className="bg-green-600 hover:bg-green-700 text-white p-2 rounded transition"
                        >
                          <CheckCircle2 size={16} />
                        </button>

                        <button
                          onClick={() => updateStatus(book._id, "reject")}
                          title="Reject Book"
                          className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded transition"
                        >
                          <XCircle size={16} />
                        </button>

                        <button
                          onClick={() => deleteBook(book._id)}
                          title="Delete Book"
                          className="bg-red-600 hover:bg-red-700 text-white p-2 rounded transition"
                        >
                          <Trash2 size={16} />
                        </button>

                      </div>
                    </td>

                  </tr>
                );
              })
            )}

          </tbody>

        </table>

      </div>
    </div>
  );
}