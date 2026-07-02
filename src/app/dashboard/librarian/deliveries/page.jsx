import { cookies } from "next/headers";
import DeliveriesTable from "./DeliveriesTable";

const baseURI =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  "http://localhost:5000";

export default async function DeliveriesPage() {
  const cookieStore = await cookies();

  const cookieString = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");

  const res = await fetch(
    `${baseURI}/api/librarian/deliveries`,
    {
      headers: {
        Cookie: cookieString,
      },
      cache: "no-store",
    }
  );

  const deliveries = await res.json();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">
        Manage Deliveries
      </h1>

      <DeliveriesTable deliveries={deliveries} />
    </div>
  );
}