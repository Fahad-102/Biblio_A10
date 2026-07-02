import { cookies } from "next/headers";
import Link from "next/link";

import { getLibrarianBooks } from "@/app/lib/api/books";
import AddBooksModal from "@/app/component/dashboard/librarian/AddBooksModal";
import BookTable from "./BookTable";

export default async function LibrarianBookPage({ searchParams }) {
  const params = await searchParams;

  const currentPage = Number(params.page) || 1;
  const search = params.search || "";

  const cookieStore = await cookies();

  const cookieString = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");

  const response = await getLibrarianBooks(
    currentPage,
    cookieString,
    search
  );

  const books = response?.books || [];
  const totalPages = response?.totalPages || 1;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <h1 className="text-3xl font-bold text-slate-800">
          Books Inventory
        </h1>

        <AddBooksModal />
      </div>

      {/* Search */}
      <form
        action="/dashboard/librarian/books"
        className="mt-6 flex flex-col sm:flex-row gap-3"
      >
        <input
          type="text"
          name="search"
          defaultValue={search}
          placeholder="Search by title..."
          className="input input-bordered w-full sm:max-w-xs"
        />

        <button className="btn btn-primary">
          Search
        </button>
      </form>

      {/* Table */}
      <div className="mt-8">
        <BookTable booksData={{ ...response, books }} />
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
          <Link
            href={`/dashboard/librarian/books?page=${currentPage - 1}&search=${search}`}
            className={`btn btn-sm ${
              currentPage === 1
                ? "pointer-events-none opacity-50"
                : ""
            }`}
          >
            Previous
          </Link>

          {Array.from({ length: totalPages }, (_, index) => {
            const page = index + 1;

            return (
              <Link
                key={page}
                href={`/dashboard/librarian/books?page=${page}&search=${search}`}
                className={`btn btn-sm ${
                  currentPage === page
                    ? "btn-primary"
                    : "btn-outline"
                }`}
              >
                {page}
              </Link>
            );
          })}

          <Link
            href={`/dashboard/librarian/books?page=${currentPage + 1}&search=${search}`}
            className={`btn btn-sm ${
              currentPage === totalPages
                ? "pointer-events-none opacity-50"
                : ""
            }`}
          >
            Next
          </Link>
        </div>
      )}
    </div>
  );
}