import { cookies } from "next/headers";
import Link from "next/link";
import { getLibrarianBooks } from "@/app/lib/api/books";
import AddBooksModal from "@/app/component/dashboard/librarian/AddBooksModal";
import BookTable from "./BookTable";

export const dynamic = "force-dynamic";

export default async function LibrarianBookPage({ searchParams }) {
  const params = await searchParams;

  const currentPage = Number(params?.page) || 1;
  const search = params?.search || "";

  const cookieStore = await cookies();

  // Get all cookies cleanly formatted
  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");

  // Fetch librarian books with cookie header
  const response = await getLibrarianBooks(
    currentPage,
    cookieHeader,
    search
  );

  const books = Array.isArray(response)
    ? response
    : response?.books || response?.data || [];

  const totalPages = response?.totalPages || 1;

  // Helper function to build pagination URLs cleanly
  const getPageUrl = (page) => {
    const urlParams = new URLSearchParams();
    urlParams.set("page", page.toString());
    if (search) urlParams.set("search", search);
    return `/dashboard/librarian/books?${urlParams.toString()}`;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            Books Inventory
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage your submitted books, track approval status, and edit listings.
          </p>
        </div>

        <AddBooksModal />
      </div>

      {/* Search Bar */}
      <form
        action="/dashboard/librarian/books"
        method="GET"
        className="flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm"
      >
        {/* Reset page to 1 on new search */}
        <input type="hidden" name="page" value="1" />

        <input
          type="text"
          name="search"
          defaultValue={search}
          placeholder="Search by title..."
          className="input input-bordered w-full sm:max-w-xs focus:outline-none focus:border-indigo-500"
        />

        <button 
          type="submit" 
          className="btn btn-primary bg-indigo-600 hover:bg-indigo-700 text-white border-none"
        >
          Search
        </button>

        {search && (
          <Link
            href="/dashboard/librarian/books"
            className="btn btn-ghost text-slate-500"
          >
            Clear Search
          </Link>
        )}
      </form>

      {/* Book Table Container */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <BookTable booksData={{ ...response, books, currentPage, totalPages }} />
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
          <Link
            href={getPageUrl(Math.max(1, currentPage - 1))}
            className={`btn btn-sm ${
              currentPage === 1 ? "btn-disabled opacity-50" : "btn-outline"
            }`}
          >
            Previous
          </Link>

          {Array.from({ length: totalPages }, (_, index) => {
            const page = index + 1;
            return (
              <Link
                key={page}
                href={getPageUrl(page)}
                className={`btn btn-sm ${
                  currentPage === page
                    ? "btn-primary bg-indigo-600 text-white border-indigo-600"
                    : "btn-outline"
                }`}
              >
                {page}
              </Link>
            );
          })}

          <Link
            href={getPageUrl(Math.min(totalPages, currentPage + 1))}
            className={`btn btn-sm ${
              currentPage === totalPages ? "btn-disabled opacity-50" : "btn-outline"
            }`}
          >
            Next
          </Link>
        </div>
      )}
    </div>
  );
}