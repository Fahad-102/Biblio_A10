"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/app/lib/api";
import { Loader2 } from "lucide-react";
import BookTable from "./BookTable";

export default function LibrarianBooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadBooks() {
      setLoading(true);
      try {
        const data = await apiFetch("/api/librarian/books");
        if (isMounted) {
          setBooks(data.books || []);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err.status === 401
              ? "Unauthorized. Please log in again."
              : "Failed to load books."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadBooks();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleRefresh = async () => {
    try {
      const data = await apiFetch("/api/librarian/books");
      setBooks(data.books || []);
    } catch (err) {
      console.error("Failed to refresh books", err);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center p-10">
        <Loader2 className="animate-spin" size={28} />
      </div>
    );

  if (error)
    return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="p-2 md:p-6 space-y-4">
      <h1 className="text-2xl font-bold text-slate-800">Manage Inventory</h1>
      <BookTable books={books} onRefresh={handleRefresh} />
    </div>
  );
}