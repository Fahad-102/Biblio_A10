"use client";
import React, { useState, useEffect } from "react";
import { Card, Button, Skeleton } from "@heroui/react";
import Link from "next/link";
import Image from "next/image";

export default function FeaturedBooks() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBooks([
        { id: 1, title: "To Kill a Mockingbird", author: "Harper Lee", category: "Fiction", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600" },
        { id: 2, title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Classic", image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=600" },
        { id: 3, title: "1984", author: "George Orwell", category: "Sci-Fi", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600" },
        { id: 4, title: "The Hobbit", author: "J.R.R. Tolkien", category: "Fantasy", image: "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?q=80&w=600" },
        { id: 5, title: "Sapiens", author: "Yuval Noah Harari", category: "History", image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=600" },
        { id: 6, title: "Atomic Habits", author: "James Clear", category: "Self-Help", image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=600" },
      ]);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
            Explore Latest
          </span>
          <h2 className="text-2xl md:text-4xl font-black tracking-tight mt-2 text-foreground">
            Featured <span className="bg-linear-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent">Books</span>
          </h2>
        </div>
        <Button 
          as={Link} 
          href="/browse-books" 
          variant="light" 
          color="primary" 
          className="font-semibold self-start md:self-auto hover:bg-primary/10"
        >
          View All Books →
        </Button>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="w-full h-105 rounded-2xl p-4 bg-content1" radius="lg">
                <Skeleton className="rounded-xl h-60 w-full" />
                <div className="space-y-3 mt-4">
                  <Skeleton className="w-2/5 rounded-lg h-4" />
                  <Skeleton className="w-4/5 rounded-lg h-6" />
                  <Skeleton className="w-3/5 rounded-lg h-4" />
                </div>
                <div className="pt-4 mt-auto">
                  <Skeleton className="w-full rounded-xl h-10" />
                </div>
              </Card>
            ))
          : books.map((book) => (
              <Card 
                key={book.id} 
                className="w-full h-105 rounded-2xl bg-content1 border border-divider hover:border-primary/30 transition-all duration-300 group overflow-hidden"
              >
                {/* Book Cover Container  */}
<div className="p-0 overflow-hidden relative w-full aspect-16/10 bg-default-50">
  <span className="absolute top-3 left-3 z-20 text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded-md border border-white/10">
    {book.category}
  </span>
  <Image
    alt={book.title}
    fill 
    sizes="(max-width: 768px) 100vw, 33vw"
    className="object-cover rounded-t-2xl transition-transform duration-500 group-hover:scale-105"
    src={book.image}
    priority={book.id <= 3}
  />
</div>
                
                {/* Book Details Container */}
                <div className="px-5 pt-4 pb-2 flex flex-col items-start justify-start gap-1 w-full">
                  <p className="text-xs text-default-400 font-medium">{book.author}</p>
                  <h3 className="text-lg font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                    {book.title}
                  </h3>
                </div>

                {/* Book Action Button Container */}
                <div className="px-5 pb-5 pt-0 mt-auto w-full">
                  <Button
                    as={Link}
                    href={`/book/${book.id}`}
                    fullWidth
                    variant="flat"
                    color="primary"
                    className="font-bold text-sm tracking-wide bg-primary/10 hover:bg-primary hover:text-white rounded-xl transition-all duration-200"
                  >
                    View Details
                  </Button>
                </div>
              </Card>
            ))
        }
        
      </div>
      <div className="mt-5 flex justify-center item-center">
        <Link href="/browse-books">
          <Button variant="outline" className="text-purple-900 hover:bg-purple-800 hover:text-white">
            Show more
          </Button>
        </Link>
      </div>
    </section>
  );
}