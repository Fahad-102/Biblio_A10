"use client"; 
import { useEffect, useState } from "react";
import DashboardOverview from "@/app/component/DashboardOverview";

const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function AdminChart() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // সরাসরি ব্যাকএন্ড বা আপনার প্রজেক্টের সেশন এন্ডপয়েন্ট থেকে ডেটা ফেচ করা
    fetch(`${base}/api/auth/get-session`, {
      method: "GET",
      credentials: "include", // কুকি পাঠানোর জন্য অত্যন্ত জরুরি
    })
      .then(res => res.json())
      .then(data => {
        setSession(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Session fetch error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-8 text-center">Loading Session...</div>;
  if (!session || !session.user) return <div className="p-8 text-center text-red-500">Unauthorized Access. Please login as Admin.</div>;

  return <DashboardOverview role={session.user.role} token={session?.session?.token || ""} />;
}