// app/page.tsx
"use client";

import React, { useEffect, useState } from "react";

type Status = "on" | "off" | "unknown";

export default function Page() {
  const [status, setStatus] = useState<Status>("unknown");
  const [loading, setLoading] = useState(false);

  async function fetchStatus() {
    try {
      const res = await fetch("/api/status");
      if (!res.ok) throw new Error("Network error");
      const data = await res.json();
      setStatus(data.status === "on" ? "on" : "off");
    } catch (e) {
      console.error(e);
      setStatus("unknown");
    }
  }

  useEffect(() => {
    fetchStatus();
    const id = setInterval(fetchStatus, 5000); // refresh every 5s
    return () => clearInterval(id);
  }, []);

  async function setStatusOnServer(newStatus: "on" | "off") {
    setLoading(true);
    try {
      const res = await fetch("/api/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to update");
      const data = await res.json();
      setStatus(data.status === "on" ? "on" : "off");
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Water / Pump Control</h1>

      <div className="p-6 bg-white rounded shadow">
        <p>
          Current status: <strong>{status.toUpperCase()}</strong>
        </p>
        <div className="mt-4 flex gap-3">
          <button
            onClick={() => setStatusOnServer("on")}
            disabled={loading}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Turn ON
          </button>
          <button
            onClick={() => setStatusOnServer("off")}
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Turn OFF
          </button>
        </div>
        <p className="text-sm mt-3 text-gray-500">
          This UI changes the server `status` which your ESP polls at{" "}
          <code>/api/status</code>.
        </p>
      </div>
    </div>
  );
}
