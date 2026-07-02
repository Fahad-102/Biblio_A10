"use client";

import { EditModal } from "@/app/component/EditModal";
import { DeleteAlert } from "@/app/component/DeleteAlert";
import { unpublishBook } from "@/app/lib/api/books";

export default function BookTable({ booksData }) {
  const books = booksData?.books || [];
  const handleUnpublish = async (id) => {
  const res = await unpublishBook(id);

  if (res.success) {
    alert("Book unpublished successfully");
    window.location.reload();
  } else {
    alert("Failed");
  }
};

  if (books.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-500">
        No books found!
      </p>
    );
  }

  return (
    <div className="overflow-x-auto border rounded-xl shadow-sm bg-white">
      <table className="table w-full">
        <thead className="bg-gray-100">
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Status</th>
            <th>Price</th>
            <th>Quantity</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {books.map((book, index) => (
            <tr key={book._id}>
              <td>
                {(booksData.currentPage - 1) * 6 + index + 1}
              </td>

              <td className="font-semibold">
                {book.title}
              </td>

              <td>
                <span
                  className={`badge ${
                    book.status === "Published"
                      ? "badge-success"
                      : book.status === "Pending"
                      ? "badge-warning"
                      : "badge-error"
                  }`}
                >
                  {book.status}
                </span>
              </td>

              <td>৳{book.price}</td>

              <td>{book.quantity}</td>

              <td>
                <div className="flex gap-2 justify-center flex-wrap">

                  <EditModal book={book} />

                  <DeleteAlert book={book} />

                  {book.status === "Published" && (
                    <button
  onClick={() => handleUnpublish(book._id)}
  className="btn btn-warning btn-sm"
>
  Unpublish
</button>
                  )}

                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}