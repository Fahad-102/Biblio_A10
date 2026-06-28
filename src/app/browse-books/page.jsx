import BookCard from "../component/BooksCard"
import SearchBooks from "../component/SearchBooks"
import { getAllBooks } from "../lib/api/books"

const AllBooksPage = async ({searchParams}) => {
  const {search} = await searchParams;
  const books = await getAllBooks(search)

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Title */}
        <div className=" flex justify-between items-center mb-8 border-b border-gray-200 pb-5">
          <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
            All Books Collection
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Explore our vast library of stories, classics, and knowledge.
          </p>
          </div>
        <div className="w-100 ">
          <SearchBooks />
        </div>
        </div>
        { search && <h2 className="font-bold text-purple-700 mb-10 ">Found {books.length} Books with the search term <b className="text-red-700">{search}</b></h2>}

        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard key={book._id || book.title} book={book} />
          ))}
        </div>

      </div>
    </div>
  )
}

export default AllBooksPage