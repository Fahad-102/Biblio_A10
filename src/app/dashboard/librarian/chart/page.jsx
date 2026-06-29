import DashboardOverview from "@/app/component/DashboardOverview";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";

export default async function LibrarianChart() {
  const session = await auth.api.getSession({ headers: await headers() });
  const role = session?.user?.role || "librarian";

  return <DashboardOverview role={role} />;
}