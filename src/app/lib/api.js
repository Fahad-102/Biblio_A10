const BACKEND_URL = "https://biblio-server-a10.vercel.app";

export async function apiFetch(path, options = {}) {
  const res = await fetch(`${BACKEND_URL}${path}`, {
    ...options,
    credentials: "include", 
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