"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { authClient, useSession } from "@/app/lib/auth-client";

export default function DashboardNavbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
   const router = useRouter();
  const { data: session, isPending } = useSession();
   const user = session?.user;
   const role = user?.role;
    const handleSignOut = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/signin"); 
          },
        },
      });
    } catch (error) {
      console.error("Sign-Out Error:", error);
    }
  };


  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full h-16 border-b border-divider bg-content1/70 backdrop-blur-md sticky top-0 z-50 px-6 flex items-center justify-between">
      
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2">
          
          <div className="text-xl font-bold bg-default-100 text-default-600 px-2 py-0.5 rounded-full border border-divider">
            Dashboard
          </div>
        </Link>
      </div>

      <div>
        <h1 className="text-xl font-bold text-slate-800">
  Welcome back, <span className="text-indigo-600">{user?.name || "Reader"}</span>! 👋
</h1>
<p>Here is what's happening with your library today.</p>
      </div>

      <div className="flex items-center gap-2 relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-primary focus:outline-none transition-transform active:scale-95 cursor-pointer"
        >
          <Image
            height={32}
            src={user?.image||"https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100"} 
            width={32}
            className="w-8 h-8 rounded-full object-cover"
            alt={user?.name || "User Avatar"} 
            suppressHydrationWarning
            />
        </button>

        {isOpen && (
          <div className="absolute right-0 top-11 w-56 bg-content1 border border-divider rounded-xl shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="px-4 py-2 border-b border-divider/50 mb-1">
              <p className="font-semibold text-[10px] text-default-400 uppercase tracking-wider">Signed in as</p>
              <p className="font-bold text-foreground truncate">{user?.name}</p>
            </div>
            
            <Link 
              href="/" 
              onClick={() => setIsOpen(false)}
              className="flex w-full px-4 py-2 text-sm text-default-600 hover:bg-default-100 transition-colors font-medium"
            >
              Back to Home
            </Link>
            
            <Link 
              href="/dashboard/profile" 
              onClick={() => setIsOpen(false)}
              className="flex w-full px-4 py-2 text-sm text-default-600 hover:bg-default-100 transition-colors font-medium"
            >
              Account Settings
            </Link>
            
            <div className="border-t border-divider/50 mt-1 pt-1">
              <button 
                onClick={handleSignOut}
                className="flex w-full px-4 py-2 text-sm text-danger hover:bg-danger/10 transition-colors font-bold text-left"
              >
                Log Out
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}