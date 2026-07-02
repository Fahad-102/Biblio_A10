"use client";

import { useRouter } from "next/navigation";

export default function DeliveriesTable({ deliveries }) {
  const router = useRouter();

  const updateStatus = async (id, status) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/librarian/deliveries/${id}`,
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      }
    );

    const data = await res.json();

    if (data.success) {
      alert("Status Updated");
      router.refresh();
    } else {
      alert("Update Failed");
    }
  };

  if (!deliveries?.length) {
    return (
      <p className="text-center text-gray-500 mt-10">
        No delivery requests found.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow">
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Book</th>
            <th>User</th>
            <th>Fee</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {deliveries.map((delivery, index) => (
            <tr key={delivery._id}>
              <td>{index + 1}</td>

              <td>{delivery.title}</td>

              <td>{delivery.user?.email}</td>

              <td>৳{delivery.deliveryFee}</td>

              <td>
                <span className="badge badge-info">
                  {delivery.status}
                </span>
              </td>

              <td>
                {delivery.status === "Pending" && (
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() =>
                      updateStatus(
                        delivery._id,
                        "Dispatched"
                      )
                    }
                  >
                    Dispatch
                  </button>
                )}

                {delivery.status === "Dispatched" && (
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() =>
                      updateStatus(
                        delivery._id,
                        "Delivered"
                      )
                    }
                  >
                    Deliver
                  </button>
                )}

                {delivery.status === "Delivered" && (
                  <span className="text-green-600 font-semibold">
                    Completed
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}