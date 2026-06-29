"use client";
import React from "react";
import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { Eye } from "lucide-react"; 
import { useSession } from "../lib/auth-client";

const BookCard = ({ book }) => {
  const { data: session } = useSession();
  const user = session?.user;

 
  const userRole = user?.role;
  const currentUserId = user?.id || user?._id;

  
  const bookOwnerId = book?.userId ? String(book.userId).trim() : null;
  const loggedInUserId = currentUserId ? String(currentUserId).trim() : null;
  const isOwner = bookOwnerId && loggedInUserId && bookOwnerId === loggedInUserId;

  const isOutOfStock = book.quantity <= 0;

  return (
    <div className="group bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full">
      
      {/* Image Container */}
      <div className="relative w-full aspect-4/5 bg-gray-50 overflow-hidden">
        <Image
          src={book.image}
          alt={book.title || "Book Cover"}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          unoptimized={true}
        />
        <div className="absolute top-3 right-3 z-10">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg shadow-sm border ${
            isOutOfStock 
              ? "bg-rose-50 text-rose-600 border-rose-100" 
              : "bg-emerald-50 text-emerald-600 border-emerald-100"
          }`}>
            {isOutOfStock ? "Out of Stock" : `Qty: ${book.quantity}`}
          </span>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-5 flex flex-col grow justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-800 line-clamp-1 mb-1 group-hover:text-purple-600 transition-colors duration-200">
            {book.title}
          </h2>
          <p className="text-sm text-gray-500 line-clamp-2 mb-4 leading-relaxed">
            {book.description || "No description available for this book."}
          </p>
        </div>

        <div>
          {/* Price Section */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100 mb-4">
            <div className="flex flex-col">
              <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Price</span>
              <span className="text-xl font-black text-purple-600">${book.price}</span>
            </div>
          </div>

          {/* Action Button */}
          <Link href={`/browse-books/${book._id}`} className="block w-full">
            <Button 
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl h-11 transition-all duration-200 shadow-sm hover:shadow-purple-100 flex items-center justify-center gap-2"
            >
              <Eye size={16} /> 
              View Details
            </Button>
          </Link>

          
          {userRole === "librarian" && !isOwner && (
            <div className="mt-3 bg-purple-50/70 border border-purple-100 text-purple-700 p-2.5 rounded-xl text-[11px] leading-tight font-medium text-center">
              🔒 <strong>Note:</strong> Non-owned book. Edit/Delete disabled for this Librarian.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;