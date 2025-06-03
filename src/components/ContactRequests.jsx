"use client";

import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function ContactRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔄 Fetch data from Firestore
  const fetchRequests = async () => {
    try {
      const q = query(collection(db, "contactRequests"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRequests(data);
    } catch (err) {
      console.error("Failed to fetch contact requests:", err);
      alert("Failed to load contact requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // ✅ Mark as resolved
  const handleMarkResolved = async (id) => {
    try {
      const ref = doc(db, "contactRequests", id);
      await updateDoc(ref, { resolved: true });
      alert("Marked as resolved");
      fetchRequests(); // refresh data
    } catch (err) {
      console.error("Failed to mark resolved:", err);
      alert("Failed to update");
    }
  };

  // 🗑️ Delete
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this request?")) return;
    try {
      await deleteDoc(doc(db, "contactRequests", id));
      alert("Deleted successfully");
      fetchRequests(); // refresh data
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">📬 Contact Requests</h2>

      {loading ? (
        <p>Loading requests...</p>
      ) : requests.length === 0 ? (
        <p>No contact requests found.</p>
      ) : (
        requests.map((req) => (
          <div
            key={req.id}
            className={`border p-4 rounded shadow mb-4 ${
              req.resolved ? "bg-green-50" : "bg-white"
            }`}
          >
            <p><strong>Name:</strong> {req.name}</p>
            <p><strong>Email:</strong> {req.email}</p>
            <p><strong>Message:</strong> {req.message}</p>
            <p className="text-sm text-gray-500 mt-1">
              {req.createdAt?.seconds
                ? new Date(req.createdAt.seconds * 1000).toLocaleString()
                : ""}
            </p>

            <div className="mt-3 flex gap-3">
              {!req.resolved && (
                <button
                  onClick={() => handleMarkResolved(req.id)}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  Mark as Resolved
                </button>
              )}
              <button
                onClick={() => handleDelete(req.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
