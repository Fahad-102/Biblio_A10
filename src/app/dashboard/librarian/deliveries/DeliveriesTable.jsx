"use client";
import { apiFetch } from "@/lib/api";

const statusFlow = { Pending: "Dispatched", Dispatched: "Delivered" };

export default function DeliveriesTable({ deliveries, onRefresh }) {
  const handleUpdateStatus = async (id, currentStatus) => {
    const nextStatus = statusFlow[currentStatus];
    if (!nextStatus) return;
    try {
      await apiFetch(`/api/librarian/deliveries/${id}`, { method: "PATCH", body: JSON.stringify({ status: nextStatus }) });
      onRefresh();
    } catch { alert("Failed to update status"); }
  };

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow border">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-100"><tr><th className="p-3">Client Email</th><th className="p-3">Book Title</th><th className="p-3">Date</th><th className="p-3">Status</th><th className="p-3 text-center">Actions</th></tr></thead>
        <tbody>
          {(!deliveries || deliveries.length === 0) && <tr><td colSpan={5} className="p-6 text-center text-gray-400">No delivery requests yet</td></tr>}
          {deliveries?.map((d) => (
            <tr key={d._id} className="border-t hover:bg-gray-50">
              <td className="p-3">{d.userEmail}</td>
              <td className="p-3">{d.title}</td>
              <td className="p-3">{new Date(d.requestedAt).toLocaleDateString()}</td>
              <td className="p-3"><span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold">{d.status}</span></td>
              <td className="p-3 text-center">
                {statusFlow[d.status] ? (
                  <button onClick={() => handleUpdateStatus(d._id, d.status)} className="bg-violet-600 hover:bg-violet-700 text-white px-3 py-1.5 rounded-lg text-xs">Mark as {statusFlow[d.status]}</button>
                ) : (
                  <span className="text-gray-400 text-xs">Completed</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}