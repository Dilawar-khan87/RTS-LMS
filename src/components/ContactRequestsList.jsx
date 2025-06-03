"use client";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";

export default function ContactRequestsList() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const q = query(collection(db, "contactRequests"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRequests(data);
    } catch (err) {
      console.error("Failed to fetch requests:", err);
    } finally {
      setLoading(false);
    }
  };

  const markResolved = async (id) => {
    try {
      await updateDoc(doc(db, "contactRequests", id), { resolved: true });
      fetchRequests(); // refresh
    } catch (err) {
      console.error("Failed to mark resolved:", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) return <p>Loading contact requests...</p>;

  return (
    <div className="p-6 bg-white rounded shadow max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Contact Requests</h2>
      {requests.length === 0 ? (
        <p>No contact requests found.</p>
      ) : (
        <ul className="space-y-4">
          {requests.map(req => (
            <li key={req.id} className="border p-4 rounded">
              <p><strong>Name:</strong> {req.name}</p>
              <p><strong>Email:</strong> {req.email}</p>
              <p><strong>Message:</strong> {req.message}</p>
              <p><strong>Date:</strong> {new Date(req.createdAt?.seconds * 1000).toLocaleString()}</p>
              <p><strong>Status:</strong> {req.resolved ? "✅ Resolved" : "❌ Pending"}</p>
              {!req.resolved && (
                <button
                  onClick={() => markResolved(req.id)}
                  className="mt-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  Mark as Resolved
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
