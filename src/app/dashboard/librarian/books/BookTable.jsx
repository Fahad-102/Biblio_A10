"use client";
import React, { useState, useEffect } from "react";
import { Pagination, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import Link from "next/link";
import { ToggleLeft, ToggleRight, Trash2 } from "lucide-react";

export default function BookTable({ booksData }) {
  const [books, setBooks] = useState(booksData?.data || []);
  
  const page = booksData.page;
  const totalPages = booksData.totalPage;
  const pages = [];
  
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  useEffect(() => {
    setBooks(booksData?.data || []);
  }, [booksData]);

  const handleStatusToggle = async (bookId, currentStatus) => {
    if (currentStatus === "Pending Approval") {
      alert("⚠️ You cannot publish a book that is Pending Approval. Only Admin can approve it!");
      return;
    }

    const newStatus = currentStatus === "Published" ? "Unpublished" : "Published";

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/books/${bookId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (res.ok) {
        setBooks(books.map(b => b._id === bookId ? { ...b, status: newStatus } : b));
      }
    } catch (error) {
      console.error("Status update failed:", error);
      setBooks(books.map(b => b._id === bookId ? { ...b, status: newStatus } : b));
    }
  };

  const handleBookDelete = async (bookId) => {
    if (!confirm("Are you sure you want to delete this book permanently?")) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/books/${bookId}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        setBooks(books.filter(b => b._id !== bookId));
      }
    } catch (error) {
      console.error("Delete failed:", error);
      setBooks(books.filter(b => b._id !== bookId));
    }
  };

  return (
    <div className="w-full">
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
              <TableCell>{book.price}</TableCell>
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
                    className="text-slate-400 hover:text-indigo-600 transition-colors"
                  >
                    {book.status === 'Published' ? (
                      <ToggleRight size={24} className="text-indigo-600" />
                    ) : (
                      <ToggleLeft size={24} />
                    )}
                  </button>

                  <button
                    onClick={() => handleBookDelete(book._id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-center mt-4">
        <Pagination size="sm">
          <Pagination.Content>
            <Pagination.Item>
              <Pagination.Previous isDisabled={page === 1}>
                <Link className="flex gap-2" href={`/dashboard/librarian/books?page=${page - 1}`}>
                  <Pagination.PreviousIcon />
                  Prev
                </Link>
              </Pagination.Previous>
            </Pagination.Item>
            
            {pages.map((p) => (
              <Pagination.Item key={p}>
                <Link href={`/dashboard/librarian/books?page=${p}`}>
                  <Pagination.Link className={`${p === page && 'bg-purple-700 text-white'}`} isActive={p === page}>
                    {p}
                  </Pagination.Link>
                </Link>
              </Pagination.Item>
            ))}
            
            <Pagination.Item>
              <Pagination.Next isDisabled={page === totalPages}>
                <Link className="flex gap-2" href={`/dashboard/librarian/books?page=${page + 1}`}>
                  Next
                  <Pagination.NextIcon />
                </Link>
              </Pagination.Next>
            </Pagination.Item>
          </Pagination.Content>
        </Pagination>
      </div>
    </div>
  );
}