"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { FaSquareFacebook, FaSquareXTwitter } from "react-icons/fa6";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Thank you for subscribing with: ${email}`);
      setEmail("muhammadfahadbinjamal@gmail.com");
    }
  };

  return (
    <footer className="w-full bg-content1 border-t border-divider text-default-600 px-6 py-12 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Column 1: Brand & About */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-black tracking-wider bg-linear-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Biblio<span className="text-foreground"><span className="text-red-800">D</span>rop</span>
            </span>
          </Link>
          <p className="text-sm text-default-500 leading-relaxed">
            Connecting avid readers with local libraries and independent book owners. Your local library, safely delivered right to your doorstep.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-bold text-foreground uppercase tracking-wider">Quick Links</h4>
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <Link href="/about" className="hover:text-primary transition-colors">About Us</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Social Media */}
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-bold text-foreground uppercase tracking-wider">Follow Us</h4>
          <p className="text-sm text-default-500">Stay updated on our latest additions.</p>
          <div className="flex items-center gap-4 mt-1">
            {/* New X (Twitter) Logo */}
            <Link
              href="https://x.com" 
              target="_blank" 
              className="p-2 text-4xl bg-default-100 hover:bg-default-200 text-foreground rounded-lg transition-colors"
            >
              <FaSquareXTwitter />
            </Link>
            {/* Facebook */}
           <Link href="https://facebook.com" target="_blank"  className="p-2 bg-default-100 hover:bg-default-200 text-4xl text-foreground rounded-lg transition-colors" >
           <FaSquareFacebook />
           </Link>

          </div>
        </div>

        {/* Column 4: Newsletter (Frontend Only) */}
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-bold text-foreground uppercase tracking-wider">Newsletter</h4>
          <p className="text-sm text-default-500">Subscribe to get notifications about book fairs and discounts.</p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2 mt-1">
            <input 
              type="email" 
              required
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-default-100 border border-divider rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-default-400"
            />
            <Button 
              type="submit" 
            variant="outline" 
              className="font-medium hover:bg-purple-800 hover:text-white "
            >
              Subscribe
            </Button>
          </form>
        </div>

      </div>

      {/* Bottom Copyright Section */}
      <div className="max-w-7xl mx-auto border-t border-divider mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-default-400">
        <p>&copy; {new Date().getFullYear()} BiblioDrop. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Developed by Muhammad Fahad Bin Jamal.
        </p>
      </div>
    </footer>
  );
}