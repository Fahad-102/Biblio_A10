import React from "react";
import AddBooksModal from "@/app/component/dashboard/librarian/AddBooksModal";
import { getLibrarianBooks } from "@/app/lib/api/books";
import BookTable from "@/app/component/dashboard/librarian/BookTable"; // পাথটি ঠিকভাবে মিলিয়ে নিবেন

const LibrarianBookPage = async ({ searchParams }) => {
  const params = await searchParams;
  
  // পেজ নম্বর ডিফাইন না থাকলে ডিফল্ট ১ পাস হবে
  const currentPage = params?.page ? Number(params.page) : 1;
  const books = await getLibrarianBooks(currentPage);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-800">Books Inventory</h1>
        <AddBooksModal />
      </div>
      <div className="mt-10">
        <BookTable booksData={books} />
      </div>
    </div>
  );
};

export default LibrarianBookPage;