import DashboardOverview from "@/app/component/DashboardOverview";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";

export default async function UserChart() {
  const session = await auth.api.getSession({ headers: await headers() });
  const role = session?.user?.role || "user";

  return <DashboardOverview role={role} />;
}