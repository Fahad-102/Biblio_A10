"use client";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { Loader2, CheckCircle, XCircle, EyeOff, Trash2 } from "lucide-react";

export default function AdminBooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ডেটা ফেচ করার জন্য একটি সাধারণ সেপারেট ফাংশন
  const fetchBooks = async () => {
    try {
      const data = await apiFetch("/api/admin/books");
      setBooks(data);
      setError(null);
    } catch (err) {
      setError(err.status === 401 ? "Unauthorized. Please log in again." : "Failed to load books.");
    } finally {
      setLoading(false);
    }
  };

  // রিয়্যাক্ট লিন্টার ওয়ার্নিং এড়াতে সরাসরি useEffect-এর ভেতরে এসিনক্রোনাস কল হ্যান্ডেল করা হলো
  useEffect(() => {
    let isMounted = true;

    async function loadInitialData() {
      try {
        const data = await apiFetch("/api/admin/books");
        if (isMounted) {
          setBooks(data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.status === 401 ? "Unauthorized. Please log in again." : "Failed to load books.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadInitialData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleApprove = async (id) => {
    try {
      await apiFetch(`/api/admin/books/approve/${id}`, { method: "PATCH" });
      fetchBooks();
    } catch {
      alert("Failed to approve");
    }
  };

  const handleReject = async (id) => {
    try {
      await apiFetch(`/api/admin/books/reject/${id}`, { method: "PATCH" });
      fetchBooks();
    } catch {
      alert("Failed to reject");
    }
  };

  const handleUnpublish = async (id) => {
    try {
      await apiFetch(`/api/admin/books/unpublish/${id}`, { method: "PATCH" });
      fetchBooks();
    } catch {
      alert("Failed to unpublish");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this book permanently?")) return;
    try {
      await apiFetch(`/api/admin/books/${id}`, { method: "DELETE" });
      fetchBooks();
    } catch {
      alert("Failed to delete");
    }
  };

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" size={28} /></div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  const pendingBooks = books.filter((b) => ["Pending Approval", "Pending", "pending"].includes(b.status));

  return (
    <div className="p-2 md:p-6 space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-3 text-slate-800">Book Approval Queue</h1>
        <div className="overflow-x-auto bg-white rounded-xl shadow border">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100"><tr><th className="p-3">Title</th><th className="p-3">Category</th><th className="p-3">Fee</th><th className="p-3">Status</th><th className="p-3 text-center">Actions</th></tr></thead>
            <tbody>
              {pendingBooks.length === 0 && <tr><td colSpan={5} className="p-6 text-center text-gray-400">No pending books</td></tr>}
              {pendingBooks.map((b) => (
                <tr key={b._id} className="border-t hover:bg-gray-50">
                  <td className="p-3 font-medium">{b.title}</td>
                  <td className="p-3">{b.category}</td>
                  <td className="p-3">৳ {b.deliveryFee}</td>
                  <td className="p-3"><span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-semibold">{b.status}</span></td>
                  <td className="p-3">
                    <div className="flex justify-center gap-2">
                      <button onClick={() => handleApprove(b._id)} className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs"><CheckCircle size={14} /> Approve & Publish</button>
                      <button onClick={() => handleReject(b._id)} className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs"><XCircle size={14} /> Reject</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-bold mb-3 text-slate-800">Manage All Books</h1>
        <div className="overflow-x-auto bg-white rounded-xl shadow border">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100"><tr><th className="p-3">Title</th><th className="p-3">Category</th><th className="p-3">Status</th><th className="p-3 text-center">Actions</th></tr></thead>
            <tbody>
              {books.length === 0 && <tr><td colSpan={4} className="p-6 text-center text-gray-400">No books found</td></tr>}
              {books.map((b) => (
                <tr key={b._id} className="border-t hover:bg-gray-50">
                  <td className="p-3 font-medium">{b.title}</td>
                  <td className="p-3">{b.category}</td>
                  <td className="p-3"><span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold">{b.status}</span></td>
                  <td className="p-3">
                    <div className="flex justify-center gap-2">
                      <button onClick={() => handleUnpublish(b._id)} className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 rounded-lg text-xs"><EyeOff size={14} /> Unpublish</button>
                      <button onClick={() => handleDelete(b._id)} className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs"><Trash2 size={14} /> Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}