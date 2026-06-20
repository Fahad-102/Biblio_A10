"use client";
import React, { useState, useEffect } from "react";
import { Card, Button, Skeleton } from "@heroui/react";
import Link from "next/link";
import Image from "next/image";

export default function TopLibrarian() {
  const [librarians, setLibrarians] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLibrarians([
        { id: 1, name: "Asif Rahman", books: 34, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400" },
        { id: 2, name: "Tanvir Ahmed", books: 28, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400" },
        { id: 3, name: "Sultana Kamal", books: 21, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400" },
        { id: 4, name: "Mehedi Hasan", books: 18, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400" },
      ]);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 py-5 text-foreground">
      
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl font-black">Top Librarians</h2>
            <p className="text-sm text-default-500 mt-1">Meet our most active book sharers.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="p-6 bg-content1 flex flex-col items-center gap-4 rounded-2xl">
                <Skeleton className="w-24 h-24 rounded-full" />
                <Skeleton className="w-3/5 h-5 rounded-lg" />
                <Skeleton className="w-full h-10 rounded-xl" />
              </Card>
            ))
          : librarians.map((user) => (
              <Card key={user.id} className="p-6 bg-content1 border border-divider hover:border-secondary rounded-2xl flex flex-col items-center text-center group transition-all">
                
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-secondary mb-4">
                  <Image 
                    src={user.avatar} 
                    alt={user.name} 
                    width={96} 
                    height={96} 
                    className="object-cover"
                  />
                </div>

                <h3 className="font-bold text-lg">{user.name}</h3>
                <p className="text-xs text-default-400 mb-6">{user.books} Books Shared</p>

                <Button
                  as={Link}
                  href={`/profile/${user.id}`}
                  fullWidth
                  color="secondary"
                  variant="flat"
                  className="font-bold rounded-xl"
                >
                  View Profile
                </Button>
              </Card>
            ))}
      </div>
    </section>
  );
}