import AddBooksModal from "@/app/component/dashboard/librarian/AddBooksModal"
import { getLibrarianBooks } from "@/app/lib/api/books"
import BookTable from "./BookTable";
import { Pagination, Table } from "@heroui/react";


const LibrarianBookPage = async({searchParams}) => {
  const params = await searchParams;
  console.log(params)
  const  books = await getLibrarianBooks(params.page)
  

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Books</h1>
        <AddBooksModal/>
      </div>
      <div className="mt-10">
      <BookTable booksData = {books}/>
      </div>
    </div>
  )
}

export default LibrarianBookPage