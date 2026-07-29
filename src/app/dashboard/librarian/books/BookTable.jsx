"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { EditModal } from "@/app/component/EditModal";
import { DeleteAlert } from "@/app/component/DeleteAlert";
import { unpublishBook } from "@/app/lib/api/books";

export default function BookTable({ booksData, limit = 6 }) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState(null);

  const books = booksData?.books || [];
  const currentPage = booksData?.currentPage || 1;

  const handleUnpublish = async (id) => {
    try {
      setLoadingId(id);
      const res = await unpublishBook(id);

      if (res?.success) {
        router.refresh();
      } else {
        alert(res?.message || "Failed to unpublish book");
      }
    } catch (error) {
      console.error("Unpublish Error:", error);
      alert("Something went wrong!");
    } finally {
      setLoadingId(null);
    }
  };

  if (books.length === 0) {
    return (
      <div className="p-12 text-center bg-white rounded-xl border border-slate-100">
        <p className="text-slate-500 font-medium">No books found!</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-2xl border border-slate-100 shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
          <tr>
            <th className="p-4">#</th>
            <th className="p-4">Title</th>
            <th className="p-4">Status</th>
            <th className="p-4">Price</th>
            <th className="p-4">Quantity</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-sm">
          {books.map((book, index) => {
            // ১. স্ট্যাটাস ক্লিন করা
            const rawStatus = (book.status || "pending").toLowerCase();

            // ২. কেবল প্রকৃত স্ট্যাটাসের উপর ভিত্তি করে শর্ত সেট করা (isApproved ফ্ল্যাগ বাদ দেওয়া হয়েছে)
            const isApprovedOrPublished =
              rawStatus === "approved" || rawStatus === "published";
            const isPending = rawStatus === "pending";

            const isUnpublishing = loadingId === book._id;

            return (
              <tr
                key={book._id || index}
                className="hover:bg-slate-50/80 transition-colors"
              >
                <td className="p-4 font-medium text-slate-500">
                  {(currentPage - 1) * limit + index + 1}
                </td>
                <td className="p-4 font-semibold text-slate-800">
                  {book.title}
                </td>
                <td className="p-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${
                      isApprovedOrPublished
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : isPending
                        ? "bg-amber-50 text-amber-700 border border-amber-200"
                        : "bg-rose-50 text-rose-700 border border-rose-200"
                    }`}
                  >
                    {book.status || "Pending"}
                  </span>
                </td>
                <td className="p-4 font-medium text-slate-700">
                  ৳{book.price ?? 0}
                </td>
                <td className="p-4 text-slate-700">{book.quantity ?? 0}</td>
                <td className="p-4">
                  <div className="flex gap-2 justify-center items-center flex-wrap">
                    <EditModal book={book} />
                    <DeleteAlert book={book} />

                    {/* ৩. অ্যাপ্রুভড/পাবলিশড থাকলে তবেই Unpublish বাটন আসবে */}
                    {isApprovedOrPublished && (
                      <button
                        onClick={() => handleUnpublish(book._id)}
                        disabled={isUnpublishing}
                        className="px-3 py-1 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center min-w-[75px]"
                      >
                        {isUnpublishing ? (
                          <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        ) : (
                          "Unpublish"
                        )}
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}