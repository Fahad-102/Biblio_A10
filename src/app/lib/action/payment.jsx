"use server"

const baseURI = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';

export const subscription = async (data) => {
  try {
    const cleanURI = baseURI.endsWith('/') ? baseURI.slice(0, -1) : baseURI;

    const res = await fetch(`${cleanURI}/subscription`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
      cache: 'no-store' 
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Backend API Error (${res.status}):`, errorText);
      return { success: false, error: `Server responded with status ${res.status}` };
    }

    const resData = await res.json()
    return resData;

  } catch (error) {
    console.error("Failed to send subscription data to backend:", error);
    return { success: false, error: "Network error or backend server is offline." };
  }
}