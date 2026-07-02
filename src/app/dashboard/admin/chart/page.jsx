
"use client"; 
import DashboardOverview from "@/app/component/DashboardOverview";
import { useEffect, useState } from "react";

export default function AdminChart() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    
    fetch("/api/auth/get-session")
      .then(res => res.json())
      .then(data => setSession(data));
  }, []);

  if (!session) return <div>Loading...</div>;

  return <DashboardOverview role={session.user.role} token={session.session.token} />;
}