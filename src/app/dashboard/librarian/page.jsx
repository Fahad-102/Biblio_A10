import AddBooksModal from "@/app/component/dashboard/librarian/AddBooksModal"

const LibrarianHomePage = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Books</h1>
        <AddBooksModal/>
      </div>
    </div>
  )
}

export default LibrarianHomePage