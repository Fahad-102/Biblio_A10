const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_SERVER_URL ||
  "http://localhost:5000";

export async function getAuthToken() {
  try {
    const res = await fetch("/api/auth/token", {
      credentials: "include",
      cache: "no-store",
    });
    if (!res.ok) {
      console.warn("[getAuthToken] Failed, status:", res.status);
      return null;
    }
    const data = await res.json();
    return data?.token || null;
  } catch (err) {
    console.error("[getAuthToken] Error:", err);
    return null;
  }
}

export async function apiFetch(path, options = {}) {
  const token = await getAuthToken();

  if (!token) {
    throw new Error("UNAUTHORIZED_NO_TOKEN");
  }

  const res = await fetch(`${BACKEND_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
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