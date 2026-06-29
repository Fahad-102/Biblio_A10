import DashboardOverview from "@/app/component/DashboardOverview";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";

export default async function AdminChart() {
  const session = await auth.api.getSession({ headers: await headers() });
  const role = session?.user?.role || "admin";

  return <DashboardOverview role={role} />;
}