"use client";

import { useEffect, useState, useCallback } from "react";
import { apiFetch } from "@/app/lib/api";
import { Loader2 } from "lucide-react";
import DeliveriesTable from "./DeliveriesTable";

export default function LibrarianDeliveriesPage() {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadDeliveries = useCallback(async () => {
    try {
      const data = await apiFetch("/api/librarian/deliveries");
      setDeliveries(Array.isArray(data) ? data : data.deliveries || []);
      setError(null);
    } catch (err) {
      setError(
        err.status === 401
          ? "Unauthorized. Please log in again."
          : "Failed to load deliveries."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      setLoading(true);
      try {
        const data = await apiFetch("/api/librarian/deliveries");
        if (isMounted) {
          setDeliveries(Array.isArray(data) ? data : data.deliveries || []);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err.status === 401
              ? "Unauthorized. Please log in again."
              : "Failed to load deliveries."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading)
    return (
      <div className="flex justify-center p-10">
        <Loader2 className="animate-spin" size={28} />
      </div>
    );

  if (error)
    return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="p-2 md:p-6 space-y-4">
      <h1 className="text-2xl font-bold text-slate-800">Manage Deliveries</h1>
      <DeliveriesTable deliveries={deliveries} onRefresh={loadDeliveries} />
    </div>
  );
}