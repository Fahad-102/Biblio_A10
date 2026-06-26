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
    <nav className="w-full h-16 border-b border-divider bg-content1/70 backdrop-blur-md sticky top-0 z-40 px-4 md:px-6 flex items-center justify-between">
      
      {/* বাম পাশ: মোবাইলে ব্র্যান্ড নেম দেখাবে, ডেক্সটপে শুধু ড্যাশবোর্ড ট্যাগ */}
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2">
          {/* মোবাইলে অ্যাপের নাম দেখানোর জন্য (যেহেতু ডেক্সটপ সাইডবার মোবাইলে হাইড থাকে) */}
          <span className="text-lg font-black tracking-wider bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent md:hidden">
            Biblio<span className="text-foreground"><span className="text-red-800">D</span>rop</span>
          </span>
          
          <div className="text-xs md:text-sm font-semibold bg-default-100 text-default-600 px-2.5 py-1 rounded-full border border-divider shadow-sm hidden sm:block">
            Dashboard
          </div>
        </Link>
      </div>

      {/* মাঝখান: স্বাগতম বার্তা (ছোট স্ক্রিনে এটি এমনিতেই হাইড থাকবে, প্যাডিং অ্যাডজাস্ট করা হয়েছে) */}
      <div className="hidden md:block">
        <h2 className="text-sm font-medium text-default-600">
          Welcome back, <span className="text-indigo-600 font-bold">{user?.name || "Reader"}</span>! 👋
        </h2>
      </div>

      {/* ডান পাশ: ইউজার প্রোফাইল এবং ড্রপডাউন */}
      <div className="flex items-center gap-3 relative" ref={dropdownRef}>
        {/* মোবাইলের জন্য ছোট করে নাম বা রোল ডেমো (ঐচ্ছিক) */}
        <span className="text-xs font-semibold text-default-500 md:hidden max-w-[80px] truncate">
          {user?.name?.split(" ")[0] || "User"}
        </span>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-indigo-600 focus:outline-none transition-transform active:scale-95 cursor-pointer shadow-sm"
        >
          <Image
            width={32}
            height={32}
            src={user?.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100"} 
            className="w-full h-full rounded-full object-cover"
            alt={user?.name || "User Avatar"} 
            suppressHydrationWarning
          />
        </button>

        {isOpen && (
          <div className="absolute right-0 top-12 w-52 md:w-56 bg-white border border-divider rounded-xl shadow-xl py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150 origin-top-right">
            <div className="px-4 py-2 border-b border-divider/50 mb-1">
              <p className="font-semibold text-[9px] text-default-400 uppercase tracking-wider">Signed in as</p>
              <p className="font-bold text-xs md:text-sm text-foreground truncate">{user?.name || user?.email}</p>
            </div>
            
            <Link 
              href="/" 
              onClick={() => setIsOpen(false)}
              className="flex w-full px-4 py-2 text-sm text-default-600 hover:bg-slate-50 transition-colors font-medium"
            >
              Back to Home
            </Link>
            
            <Link 
              href="/dashboard/profile" 
              onClick={() => setIsOpen(false)}
              className="flex w-full px-4 py-2 text-sm text-default-600 hover:bg-slate-50 transition-colors font-medium"
            >
              Account Settings
            </Link>
            
            <div className="border-t border-divider/50 mt-1 pt-1">
              <button 
                onClick={handleSignOut}
                className="flex w-full px-4 py-2 text-sm text-danger hover:bg-danger/5 transition-colors font-bold text-left cursor-pointer"
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