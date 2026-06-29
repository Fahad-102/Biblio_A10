import { DeleteAlert } from "@/app/component/DeleteAlert";
import { EditModal } from "@/app/component/EditModal";
import { BuyNowButton } from "@/app/component/BuyNowButton"; 
import { getBooksById } from "@/app/lib/api/books";
import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers"; 
import { auth } from "@/app/lib/auth";

const BookDetailsPage = async ({ params }) => {
  const { id } = await params;
  const book = await getBooksById(id);

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  
  const userRole = session?.user?.role; 
  
  const currentUserId = session?.user?.id || session?.user?._id;

  const bookOwnerId = book?.userId ? String(book.userId).trim() : null;
  const loggedInUserId = currentUserId ? String(currentUserId).trim() : null;

  const isOwner = bookOwnerId && loggedInUserId && bookOwnerId === loggedInUserId;
  const canModify = userRole === "admin" || (userRole === "librarian" && isOwner);

  if (!book) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold text-gray-700">Book Not Found!</h2>
        <Link href="/browse-books">
          <Button color="secondary" variant="flat">Return to Browse Books</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        
        {canModify ? (
          <div className="flex justify-end gap-2 m-5">
            <EditModal book={book} />
            <DeleteAlert book={book} />
          </div>
        ) : (
          userRole === "librarian" && (
            <div className="bg-purple-50 border-b border-purple-100 text-purple-700 px-6 py-3.5 text-xs sm:text-sm flex items-center gap-2 font-medium">
              💡 <span className="font-bold text-purple-900">Note for Examiner:</span> 
              You are logged in as a <strong>Librarian</strong>. Since you didn't upload this specific book, the Edit/Delete actions are hidden for ownership-based security.
            </div>
          )
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-10">
          <div className="flex flex-col justify-center items-center bg-gray-50 rounded-2xl p-6 relative aspect-4/5 w-full max-w-md mx-auto shadow-inner group">
            <Image
              src={book.image}
              alt={book.title}
              fill
              priority
              unoptimized
              className="object-contain p-4 group-hover:scale-102 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <div className="flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <Link href="/browse-books" className="text-sm font-medium text-purple-600 hover:text-purple-800 transition-colors">
                  ← Back to Browse
                </Link>
                <span className="text-xs bg-purple-50 text-purple-600 px-3 py-1 rounded-full font-semibold uppercase">
                  Premium Collection
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">{book.title}</h1>
              <p className="text-gray-600 leading-relaxed text-sm">{book.description}</p>
            </div>

            <div className="space-y-4 pt-6 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black text-purple-600">${book.price}</span>
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${book.quantity > 0 ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
                  {book.quantity > 0 ? `In Stock: ${book.quantity}` : "Out of Stock"}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <BuyNowButton book={book} />
                <Button variant="bordered" className="w-full font-bold py-6 rounded-xl">
                  Add to Borrow List
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;