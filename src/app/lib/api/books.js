const baseURI =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  "http://localhost:5000";

export const getAllBooks = async ({
  search = "",
  page = 1,
  limit = 6,
  category = "",
  availability = "",
  minFee = "",
  maxFee = "",
}) => {
  const params = new URLSearchParams({
    search,
    page,
    limit,
    category,
    availability,
    minFee,
    maxFee,
  });

  const res = await fetch(
    `${baseURI}/books?${params.toString()}`,
    { cache: "no-store" }
  );

  return res.json();
};



export const getLibrarianBooks = async (currentPage = 1, sessionToken, search = "", limit = 6) => {
  const res = await fetch(
    `${baseURI}/api/librarian/books?page=${currentPage}&limit=${limit}&search=${encodeURIComponent(search)}`,
    {
      headers: {
        "Content-Type": "application/json",
        "Cookie": `better-auth.session_token=${sessionToken}`, 
      },
      cache: "no-store",
    }
  );

  return await res.json();
};

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
export const updateBook = async (id, bookData) => {
  const res = await fetch(`${baseURI}/books/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(bookData)
  });
  return res.json();
};



// export const updateBook = async (id, bookData, token) => {
//   try {
//     const res = await fetch(`${baseURI}/books/${id}`, {
//       method: "PATCH",
//       headers: {
//         "Authorization": `Bearer ${token}`,
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(bookData)
//     });
//     return await res.json();
//   } catch (error) {
//     console.error("Error updating book:", error);
//     return { error: "Failed to update" };
//   }
// };



export const deleteBook = async (id, token) => {
  const res = await fetch(`${baseURI}/books/${id}`, {
    method: "DELETE",
    headers: { "Authorization": `Bearer ${token}` }
  });
  return res.json();
};

export const addBook = async (bookData) => {
  const res = await fetch(`${baseURI}/api/books`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", 
    body: JSON.stringify(bookData)
  });
  return res.json();
};

export const getDashboardStats = async () => {
  const res = await fetch(`${baseURI}/api/dashboard-stats`, {
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch dashboard stats");
  }

  return res.json();
};

export const unpublishBook = async (id) => {
  const res = await fetch(
    `${baseURI}/api/librarian/books/unpublish/${id}`,
    {
      method: "PATCH",
      credentials: "include",
    }
  );

  return await res.json();
};

export const requestDelivery = async (bookId) => {
  const res = await fetch(`${baseURI}/api/deliveries`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ bookId }),
  });

  return await res.json();
};

export const getDeliveryHistory = async () => {
  const res = await fetch(
    `${baseURI}/api/user/delivery-history`,
    {
      credentials: "include",
      cache: "no-store",
    }
  );

  return await res.json();
};
