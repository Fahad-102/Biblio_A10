"use client";
import { apiFetch } from "@/app/lib/api";
import { Trash2, EyeOff } from "lucide-react";

export default function BookTable({ books, onRefresh }) {
  const handleUnpublish = async (id) => { try { await apiFetch(`/api/librarian/books/unpublish/${id}`, { method: "PATCH" }); onRefresh(); } catch { alert("Failed to unpublish"); } };
  const handleDelete = async (id) => { if (!confirm("Delete this book?")) return; try { await apiFetch(`/api/librarian/books/${id}`, { method: "DELETE" }); onRefresh(); } catch { alert("Failed to delete"); } };

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow border">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-100"><tr><th className="p-3">Title</th><th className="p-3">Category</th><th className="p-3">Status</th><th className="p-3 text-center">Actions</th></tr></thead>
        <tbody>
          {(!books || books.length === 0) && <tr><td colSpan={4} className="p-6 text-center text-gray-400">No books added yet</td></tr>}
          {books?.map((b) => (
            <tr key={b._id} className="border-t hover:bg-gray-50">
              <td className="p-3 font-medium">{b.title}</td>
              <td className="p-3">{b.category}</td>
              <td className="p-3"><span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold">{b.status}</span></td>
              <td className="p-3">
                <div className="flex justify-center gap-2">
                  {(b.status === "Approved" || b.status === "Published") && <button onClick={() => handleUnpublish(b._id)} className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 rounded-lg text-xs"><EyeOff size={14} /> Unpublish</button>}
                  <button onClick={() => handleDelete(b._id)} className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs"><Trash2 size={14} /> Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}