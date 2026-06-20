"use client";
import React, { useState } from "react";
import { Button } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AppNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathname = usePathname();

  const user = {
    loggedIn: true,
    name: "Fahad",
    email: "fahad@gmail.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
    role: "librarian" 
  };

  
  const isActive = (path) => pathname === path;

  return (
    <nav className="w-full bg-background/70 backdrop-blur-md border-b border-divider sticky top-0 z-50 px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-black tracking-wider bg-linear-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
            Biblio<span className="text-foreground">Drop</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-2">
          <Link 
            href="/" 
            className={`text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-200 ${
              isActive('/') 
                ? 'bg-primary/10 text-red-500' 
                : 'text-default-600 hover:bg-default-100 hover:text-foreground' 
            }`}
          >
            Home
          </Link>
          
          <Link 
            href="/browse-books" 
            className={`text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-200 ${
              isActive('/browse-books') 
                ? 'bg-primary/10 text-red-500' 
                : 'text-default-600 hover:bg-default-100 hover:text-foreground' 
            }`}
          >
            Browse Books
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {user.loggedIn ? (
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="focus:outline-none ring-2 ring-primary rounded-full p-0.5 transition-transform active:scale-95"
              >
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-8 h-8 rounded-full object-cover"
                />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-content1 border border-divider rounded-xl shadow-lg py-2 z-50">
                  <div className="px-4 py-2 border-b border-divider">
                    <p className="text-xs text-default-500 font-medium">Signed in as</p>
                    <p className="text-sm font-bold text-primary truncate">{user.email}</p>
                    <span className="inline-block mt-1 text-[10px] uppercase font-bold tracking-wider bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                      {user.role}
                    </span>
                  </div>
                  <Link 
                    href={`/dashboard/${user.role}`}
                    className="block px-4 py-2 text-sm text-default-700 hover:bg-default-100 transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    My Dashboard
                  </Link>
                  <button 
                    className="w-full text-left px-4 py-2 text-sm text-danger hover:bg-danger-50 transition-colors"
                    onClick={() => {
                      setIsProfileOpen(false);
                    }}
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-3">
              <Link href="/login" className="text-sm font-medium text-default-600 hover:text-primary transition-colors">
                Login
              </Link>
              <Button as={Link} href="/register" color="primary" size="sm" radius="md" className="font-medium">
                Sign Up
              </Button>
            </div>
          )}

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-default-600 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden mt-3 border-t border-divider pt-3 flex flex-col gap-2">
          <Link 
            href="/" 
            className={`text-base font-semibold py-2 px-3 rounded-xl transition-colors ${
              isActive('/') 
                ? 'bg-primary/10 text-primary' 
                : 'text-default-600 hover:bg-default-100'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          
          <Link 
            href="/browse-books" 
            className={`text-base font-semibold py-2 px-3 rounded-xl transition-colors ${
              isActive('/browse-books') 
                ? 'bg-primary/10 text-primary' 
                : 'text-default-600 hover:bg-default-100'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Browse Books
          </Link>
          
          {!user.loggedIn && (
            <div className="flex flex-col gap-2 pt-2 border-t border-divider">
              <Link href="/login" className="text-center text-sm font-medium py-2 border border-divider rounded-xl">
                Login
              </Link>
              <Button as={Link} href="/register" color="primary" fullWidth radius="md">
                Sign Up
              </Button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}