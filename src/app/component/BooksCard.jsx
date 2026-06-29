"use client";
import React from "react";
import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "../lib/auth-client";

const BookCard = ({ book }) => {
  const { data: session } = useSession();
  const user = session?.user;

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

        {/* Price and Stock */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-50 mb-4">
          <span className="text-xl font-extrabold text-indigo-600">${book.price}</span>
          <span className="text-xs bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full font-medium">
            Qty: {book.quantity}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2">
          <Link href={`/browse-books/${book._id}`}>
            <Button className="w-full bg-purple-600 text-white hover:bg-purple-700">
              View Details
            </Button>
          </Link>

          {/* Librarian Role Check */}
          {user?.role === "librarian" && (
            <div className="flex gap-2">
              <Link href={`/dashboard/librarian/edit/${book._id}`} className="flex-1">
                <Button color="warning" className="w-full">Edit</Button>
              </Link>
              <Button color="danger" className="w-full">Delete</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;