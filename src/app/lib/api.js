const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_SERVER_URL ||
  "http://localhost:5000";

export async function apiFetch(path, options = {}) {
  const res = await fetch(`${BACKEND_URL}${path}`, {
    ...options,
    credentials: "include", // ব্রাউজারের সেশন কুকি সরাসরি সার্ভারে পাঠিয়ে দিবে
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const errBody = await res.text().catch(() => "");
    const error = new Error(`API_ERROR_${res.status}`);
    error.status = res.status;
    error.body = errBody;
    throw error;
  }

  return res.json();
}