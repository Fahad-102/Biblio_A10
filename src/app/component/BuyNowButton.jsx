"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import { toast } from "react-toastify";
import { useSession } from "../lib/auth-client";
import { requestDelivery } from "../lib/api/books";

export function BuyNowButton({ book, disabled = false }) {
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const currentUserId = session?.user?.id || session?.user?._id;
  const bookOwnerId = book?.userId
    ? String(book.userId).trim()
    : null;
  const loggedInUserId = currentUserId
    ? String(currentUserId).trim()
    : null;

  const isOwner =
    bookOwnerId &&
    loggedInUserId &&
    bookOwnerId === loggedInUserId;

  const isUnavailable =
    book?.availability === "Unavailable" ||
    book?.status !== "Published";

  const isDisabled =
    disabled ||
    isOwner ||
    isUnavailable ||
    loading;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!session) {
      toast.error("Please login first.");
      return;
    }

    if (isDisabled) return;

    setLoading(true);

    try {
      const res = await requestDelivery(book._id);

      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message || "Request failed.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    }

    setLoading(false);
  };

  if (!isMounted) {
    return (
      <Button
        isDisabled
        className="w-full py-6"
      >
        Loading...
      </Button>
    );
  }

  return (
    <form
      className="w-full"
      onSubmit={handleSubmit}
    >
      <Button
        type="submit"
        isDisabled={isDisabled}
        className="w-full bg-purple-600 text-white font-bold py-6 rounded-xl"
      >
        {loading
          ? "Requesting..."
          : isOwner
          ? "Your Own Book"
          : isUnavailable
          ? "Unavailable"
          : "Request Delivery"}
      </Button>
    </form>
  );
}