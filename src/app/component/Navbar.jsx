"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient, useSession } from "../lib/auth-client";
import Image from "next/image";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathname = usePathname();
  if(pathname.includes('dashboard')){
    return null;
  }
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const handleSignOut = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            setIsProfileOpen(false);
            router.push("/signin"); 
          },
        },
      });
    } catch (error) {
      console.error("Sign-Out Error:", error);
    }
  };

  const user = session?.user;
  const isActive = (path) => pathname === path;

  return (
    <nav className="w-full bg-background/70 backdrop-blur-md border-b border-divider sticky top-0 z-50 px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-black tracking-wider bg-linear-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
            Biblio<span className="text-foreground"><span className="text-red-800">D</span>rop</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
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

        {/* Right Menu */}
        <div className="flex items-center gap-4">
          {user?.image ?
        <>
                    <p className="text-purple-800">Hello,{user?.name}</p>
        </>  
        :
        <>
        </>
        }
          <div className="relative">
                
            {/* Avatar Trigger Button */}
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="focus:outline-none ring-2 ring-slate-200 hover:ring-indigo-500 rounded-full p-0.5 transition-transform active:scale-95 flex items-center justify-center bg-default-100"
            >
              {user?.image ? (
                <Image
                  height={32}
                  width={32}
                  src={user?.image} 
                  alt={user?.name || "User Avatar"} 
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-default-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
            </button>

            {/* Solid White Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white text-slate-900 border border-slate-200 rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                
                {isPending ? (
                  <div className="px-4 py-2 text-sm text-slate-400">Loading...</div>
                ) : session ? (
                  <>
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs text-slate-400 font-medium">Signed in as</p>
                      <p className="text-sm font-bold text-indigo-600 truncate">{user?.email}</p>
                      <span className="inline-block mt-1 text-[10px] uppercase font-bold tracking-wider bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full">
                        {user?.role}
                      </span>
                    </div>

                    <div className="flex flex-col p-1 gap-0.5">
                      <Link 
                        href={`/dashboard/${user?.role || ""}`}
                        className="block px-3 py-2 text-sm font-medium rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        My Dashboard
                      </Link>
                      <button 
                        className="w-full text-left px-3 py-2 text-sm font-medium rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                        onClick={handleSignOut}
                      >
                        Log Out
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col p-1 gap-0.5">
                    <Link 
                      href="/signin" 
                      className="block px-3 py-2 text-sm font-medium rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Sign In (Login)
                    </Link>
                    <Link 
                      href="/signup" 
                      className="block px-3 py-2 text-sm font-semibold rounded-lg text-indigo-600 hover:bg-indigo-50 transition-colors"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Sign Up (Register)
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Hamburger Menu Icon */}
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

      {/* Mobile Responsive Nav Links */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-3 border-t border-divider pt-3 flex flex-col gap-2">
          <Link 
            href="/" 
            className={`text-base font-semibold py-2 px-3 rounded-xl transition-colors ${
              isActive('/') ? 'bg-primary/10 text-primary' : 'text-default-600 hover:bg-default-100'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          
          <Link 
            href="/browse-books" 
            className={`text-base font-semibold py-2 px-3 rounded-xl transition-colors ${
              isActive('/browse-books') ? 'bg-primary/10 text-primary' : 'text-default-600 hover:bg-default-100'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Browse Books
          </Link>
        </div>
      )}
    </nav>
  );
}