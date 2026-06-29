"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import { toast } from "react-toastify";

export function BuyNowButton({ book }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleBuyClick = (e) => {
    if (loading) {
      e.preventDefault();
      return;
    }
    
    setLoading(true);
    toast.info(`Redirecting to Stripe secure checkout... 💳`, {
      autoClose: 3000,
    });
  };

  return (
    <form action="/api/payment" method="POST" className="w-full" onSubmit={handleBuyClick}>
      <input type="hidden" name="price" value={book.price} />
      <input type="hidden" name="title" value={book.title} />
      <input type="hidden" name="bookId" value={book._id} />
      
      <Button 
        type="submit" 
        disabled={book.quantity <= 0 || loading}
        className="w-full bg-purple-600 text-white font-bold py-6 rounded-xl shadow-lg shadow-purple-200 hover:bg-purple-700 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
      >
        {loading ? "Processing..." : book.quantity <= 0 ? "Out of Stock" : "Buy Now"}
      </Button>
    </form>
  );
}