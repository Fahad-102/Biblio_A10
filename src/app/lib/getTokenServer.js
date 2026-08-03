import { headers } from "next/headers";

const baseURI = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function getDashboardStatsServer() {
  try {
    const cookieHeader = (await headers()).get("cookie") || "";

    const res = await fetch(`${baseURI}/api/librarian/stats`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader, // ব্রাউজারের সেশন কুকি ব্যাকএন্ডে পাঠিয়ে দেওয়া হলো
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return { myBooks: 0, pendingRequests: 0, approvedBooks: 0, totalEarnings: 0 };
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching stats:", error);
    return { myBooks: 0, pendingRequests: 0, approvedBooks: 0, totalEarnings: 0 };
  }
}