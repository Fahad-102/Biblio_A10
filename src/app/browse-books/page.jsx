import BookCard from "../component/BooksCard"
import SearchBooks from "../component/SearchBooks"
import Link from "next/link"
import { getAllBooks } from "../lib/api/books";

const AllBooksPage = async ({ searchParams }) => {
  const params = await searchParams;
  const search = params.search || "";
  const currentPage = Number(params.page) || 1;

  const response = await getAllBooks(search, currentPage);
  
  const books = response?.data || [];
  const totalPage = response?.totalPage || 1;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 border-b border-gray-200 pb-5 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
              All Books Collection
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Explore our vast library of stories, classics, and knowledge.
            </p>
          </div>
          
          <div className="w-full md:w-80">
            <SearchBooks />
          </div>
        </div>

        {search && (
          <h2 className="font-bold text-purple-700 mb-10 text-sm sm:text-base">
            Found {books.length} Books with the search term <b className="text-red-700">"{search}"</b>
          </h2>
        )}

        {books.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {books.map((book) => (
              <BookCard key={book._id || book.title} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No books found.</p>
          </div>
        )}

        {totalPage > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12 pt-6 border-t border-gray-200">
            <Link
              href={`?page=${currentPage - 1}${search ? `&search=${search}` : ""}`}
              className={`px-4 py-2 text-sm font-medium rounded-md border ${
                currentPage <= 1
                  ? "bg-gray-100 text-gray-400 pointer-events-none"
                  : "bg-white text-gray-700 hover:bg-gray-50 shadow-sm transition"
              }`}
            >
              Previous
            </Link>

            <span className="text-sm text-gray-600 font-medium">
              Page {currentPage} of {totalPage}
            </span>

            <Link
              href={`?page=${currentPage + 1}${search ? `&search=${search}` : ""}`}
              className={`px-4 py-2 text-sm font-medium rounded-md border ${
                currentPage >= totalPage
                  ? "bg-gray-100 text-gray-400 pointer-events-none"
                  : "bg-white text-gray-700 hover:bg-gray-50 shadow-sm transition"
              }`}
            >
              Next
            </Link>
          </div>
        )}

      </div>
    </div>
  )
}

export default AllBooksPage