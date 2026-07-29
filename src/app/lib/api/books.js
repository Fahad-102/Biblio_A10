const baseURI =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_SERVER_URL ||
  "http://localhost:5000";

// Safe JSON parser helper
const handleResponse = async (res) => {
  const contentType = res.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data?.message || `Server error: ${res.status}`);
    }
    return data;
  }

  const errorText = await res.text();
  console.error("Non-JSON Server Response:", errorText);
  throw new Error(`Server Error (${res.status}): Route not found or backend crashed.`);
};

// 1. Get All Books (Public page with search & filters)
export const getAllBooks = async ({
  search = "",
  page = 1,
  limit = 6,
  category = "",
  availability = "",
  minFee = "",
  maxFee = "",
} = {}) => {
  try {
    const params = new URLSearchParams({
      search,
      page,
      limit,
      category,
      availability,
      minFee,
      maxFee,
    });

    const res = await fetch(`${baseURI}/books?${params.toString()}`, {
      cache: "no-store",
    });

    if (!res.ok) return { books: [], totalPages: 1 };
    return await res.json();
  } catch (error) {
    console.error("Error in getAllBooks:", error);
    return { books: [], totalPages: 1 };
  }
};

// 2. Get Librarian Books (Cookie Header passing)
export const getLibrarianBooks = async (
  currentPage = 1,
  cookieHeader = "",
  search = "",
  limit = 6
) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    if (cookieHeader) {
      headers["Cookie"] = cookieHeader;
    }

    const res = await fetch(
      `${baseURI}/api/librarian/books?page=${currentPage}&limit=${limit}&search=${encodeURIComponent(
        search
      )}`,
      {
        headers,
        credentials: "include",
        cache: "no-store",
      }
    );

    if (!res.ok) return { books: [], totalPages: 1 };
    return await res.json();
  } catch (error) {
    console.error("Error in getLibrarianBooks:", error);
    return { books: [], totalPages: 1 };
  }
};

// 3. Get Single Book By ID
export const getBooksById = async (id) => {
  try {
    const res = await fetch(`${baseURI}/books/${id}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch book");
    return await res.json();
  } catch (error) {
    console.error("Error fetching book:", error);
    return null;
  }
};

// 4. Update Book
export const updateBook = async (id, bookData) => {
  try {
    const targetUrl = `${baseURI}/api/librarian/books/${id}`;

    const res = await fetch(targetUrl, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(bookData),
    });

    return await handleResponse(res);
  } catch (error) {
    console.error("Error updating book:", error);
    throw error;
  }
};

// 5. Delete Book
export const deleteBook = async (id, token) => {
  try {
    const headers = {};
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(`${baseURI}/api/librarian/books/${id}`, {
      method: "DELETE",
      headers,
      credentials: "include",
    });
    return await handleResponse(res);
  } catch (error) {
    console.error("Error deleting book:", error);
    return { success: false };
  }
};

// 6. Add Book
export const addBook = async (bookData) => {
  try {
    const payload = {
      ...bookData,
      status: bookData.status || "Approved",
      isApproved: true,
    };

    const res = await fetch(`${baseURI}/api/books`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });
    return await handleResponse(res);
  } catch (error) {
    console.error("Error adding book:", error);
    return { success: false };
  }
};

// 7. Get Dashboard Stats (FIXED: Handles 404 gracefully with fallback)
export const getDashboardStats = async (cookieHeader = "") => {
  try {
    const headers = { "Content-Type": "application/json" };
    if (cookieHeader) headers["Cookie"] = cookieHeader;

    const res = await fetch(`${baseURI}/api/librarian/stats`, {
      method: "GET",
      headers,
      credentials: "include",
      cache: "no-store",
    });

    if (!res.ok) {
      console.warn(`Stats API status: ${res.status}. Returning fallback stats.`);
      return { myBooks: 0, pendingRequests: 0, approvedBooks: 0, totalEarnings: 0 };
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return { myBooks: 0, pendingRequests: 0, approvedBooks: 0, totalEarnings: 0 };
  }
};

// 8. Unpublish Book
export const unpublishBook = async (id) => {
  try {
    const res = await fetch(`${baseURI}/api/librarian/books/unpublish/${id}`, {
      method: "PATCH",
      credentials: "include",
    });
    return await handleResponse(res);
  } catch (error) {
    console.error("Error unpublishing book:", error);
    return { success: false };
  }
};

// 9. Request Delivery (Updated to Stripe Checkout Session Route)
export const requestDelivery = async (bookId) => {
  try {
    const res = await fetch(`${baseURI}/api/create-checkout-session`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bookId }),
    });

    const data = await handleResponse(res);

    // স্ট্রাইপ চেকআউটের ইউআরএল পেলে রিডাইরেক্ট করে দিবে
    if (data?.url) {
      window.location.href = data.url;
    }

    return data;
  } catch (error) {
    console.error("Error requesting delivery session:", error);
    return { success: false };
  }
};

// 10. Get Delivery History
export const getDeliveryHistory = async () => {
  try {
    const res = await fetch(`${baseURI}/api/user/delivery-history`, {
      credentials: "include",
      cache: "no-store",
    });

    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Error fetching delivery history:", error);
    return [];
  }
};