"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function addBooks(bookData) {
  try {
    const cookieStore = await cookies();
    const token =
      cookieStore.get("__Secure-better-auth.session_token")?.value ||
      cookieStore.get("better-auth.session_token")?.value;

    const backendUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

    const res = await fetch(`${backendUrl}/api/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(bookData),
    });

    const data = await res.json();

    if (res.ok) {
      revalidatePath("/dashboard/librarian/books");
      revalidatePath("/dashboard/librarian");
      return { success: true, ...data };
    }

    return { success: false, error: data.message || "Failed to add book" };
  } catch (error) {
    console.error("Server Action Error (addBooks):", error);
    return { success: false, error: error.message };
  }
}