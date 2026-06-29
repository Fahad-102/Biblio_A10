"use client";
import React, { useState, useEffect } from "react";
import { Pagination, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import { useRouter } from "next/navigation";
import { ToggleLeft, ToggleRight, Trash2 } from "lucide-react";

export default function BookTable({ booksData }) {
  const [books, setBooks] = useState(booksData?.data || []);
  const router = useRouter();
  
  const page = Number(booksData?.page) || 1;
  const totalPages = Number(booksData?.totalPage) || 1;

  useEffect(() => {
    setBooks(booksData?.data || []);
  }, [booksData]);

  // 🌟 কুকি থেকে অথেনটিকেশন টোকেন রিড করার জন্য হেডার মেকার
  const getHeaders = () => {
    const token = document.cookie
      .split("; ")
      .find(row => row.startsWith("token="))
      ?.split("=")[1] || ""; 
    
    return {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}` 
    };
  };

  // 🔄 পাবলিশ/আনপাবলিশ স্ট্যাটাস টগল
  const handleStatusToggle = async (bookId, currentStatus) => {
    if (currentStatus === "Pending Approval") {
      alert("⚠️ You cannot publish a book that is Pending Approval. Only Admin can approve it!");
      return;
    }

    const newStatus = currentStatus === "Published" ? "Unpublished" : "Published";
    const baseURI = process.env.NEXT_PUBLIC_API_URL || 'https://biblio-server-a10.vercel.app';

    try {
      const res = await fetch(`${baseURI}/books/${bookId}`, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify({ status: newStatus })
      });

      if (res.ok) {
        setBooks(books.map(b => b._id === bookId ? { ...b, status: newStatus } : b));
      } else {
        alert("Failed to update status. Please check your Librarian permissions.");
      }
    } catch (error) {
      console.error("Status update failed:", error);
    }
  };

  // 🗑️ বই ডিলিট করার লজিক
  const handleBookDelete = async (bookId) => {
    if (!confirm("Are you sure you want to delete this book permanently?")) return;
    const baseURI = process.env.NEXT_PUBLIC_API_URL || 'https://biblio-server-a10.vercel.app';

    try {
      const res = await fetch(`${baseURI}/books/${bookId}`, {
        method: 'DELETE',
        headers: getHeaders()
      });

      if (res.ok) {
        setBooks(books.filter(b => b._id !== bookId));
      } else {
        alert("Failed to delete book. Please check your permissions.");
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  // 📄 প্যাজিনেশন চেঞ্জ হ্যান্ডলার
  const handlePageChange = (newPage) => {
    router.push(`/dashboard/librarian/books?page=${newPage}`);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <Table aria-label="Books Inventory Table">
        <TableHeader>
          <TableColumn>#</TableColumn>
          <TableColumn>Title</TableColumn>
          <TableColumn>Price</TableColumn>
          <TableColumn>Quantity</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn className="text-center">Actions</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No books found in your inventory."}>
          {books.map((book, index) => (
            <TableRow key={book._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell className="font-medium text-slate-900">{book.title}</TableCell>
              <TableCell>${book.price}</TableCell>
              <TableCell>{book.quantity}</TableCell>
              <TableCell>
                <span className={`px-2 py-0.5 rounded-md text-xs font-bold ${
                  book.status === 'Published' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                  book.status === 'Pending Approval' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                  'bg-slate-100 text-slate-600 border border-slate-200'
                }`}>
                  {book.status || "Unpublished"}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => handleStatusToggle(book._id, book.status)}
                    className="text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer"
                  >
                    {book.status === 'Published' ? (
                      <ToggleRight size={24} className="text-indigo-600" />
                    ) : (
                      <ToggleLeft size={24} />
                    )}
                  </button>

                  <button
                    onClick={() => handleBookDelete(book._id)}
                    className="text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* 🌟 HeroUI অফিশিয়াল ক্লিন প্যাজিনেশন */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={page}
            total={totalPages}
            onChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}