import { Button } from "@heroui/react"
import Image from "next/image"
import Link from "next/link"

const BookCard = ({ book }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative w-full aspect-4/5 bg-gray-50 overflow-hidden">
        <Image
          src={book.image} 
          alt={book.title || "Book Cover"}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover hover:scale-105 transition-transform duration-300"
          suppressHydrationWarning
          priority={true} 
          unoptimized={true}
        />
      </div>

      {/* Content Container */}
      <div className="p-4 flex flex-col grow justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-800 line-clamp-1 mb-1">
            {book.title}
          </h2>
          <p className="text-sm text-gray-500 line-clamp-2 mb-4">
            {book.description}
          </p>
        </div>

        {/* Price and Stock / Action */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-50">
          <div>
            <span className="text-xs text-gray-400 block">Price</span>
            <span className="text-xl font-extrabold text-indigo-600">
              ${book.price}
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full font-medium inline-block">
              Qty: {book.quantity}
            </span>
          </div>
        </div>
      </div>

      <Link href={`/browse-books/${book._id}`}>
        <Button 
          variant="outline" 
          className="w-full py-2 px-4 rounded-2xl border-purple-600 text-purple-700 font-medium tracking-wide hover:bg-purple-700 hover:text-white shadow-sm transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 active:translate-y-0"
        >
          View Details
        </Button>
      </Link>
    </div>
  )
}

export default BookCard;