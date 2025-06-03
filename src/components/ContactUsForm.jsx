"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { updateDoc, deleteDoc, doc,collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function ContactUsForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ type: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      setToast({ type: "error", message: "All fields are required." });
      return;
    }

    try {
      setLoading(true);
      await addDoc(collection(db, "contactRequests"), {
        name,
        email,
        message,
        createdAt: serverTimestamp(),
        resolved: false,
      });

      setName("");
      setEmail("");
      setMessage("");
      setToast({ type: "success", message: "Message sent successfully!" });
    } catch (err) {
      console.error(err);
      setToast({ type: "error", message: "Failed to send message." });
    } finally {
      setLoading(false);
      setTimeout(() => setToast({ type: "", message: "" }), 3000);
    }
  };

  const handleMarkResolved = async (id) => {
  try {
    const ref = doc(db, "contactRequests", id);
    await updateDoc(ref, { resolved: true });
    alert("Marked as resolved");
  } catch (err) {
    console.error("Failed to mark resolved:", err);
    alert("Failed to update");
  }
};

const handleDelete = async (id) => {
  if (!confirm("Are you sure you want to delete this request?")) return;
  try {
    await deleteDoc(doc(db, "contactRequests", id));
    alert("Deleted successfully");
  } catch (err) {
    console.error("Delete failed:", err);
    alert("Failed to delete");
  }
};


  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg relative">
      <h2 className="text-2xl font-semibold mb-6 text-blue-700">Contact Us</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-3 border border-gray-300 rounded focus:outline-blue-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full p-3 border border-gray-300 rounded focus:outline-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          placeholder="Your Message"
          className="w-full p-3 border border-gray-300 rounded focus:outline-blue-500"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>

      {/* Toast Message */}
      {toast.message && (
        <div
          className={`absolute top-2 right-2 px-4 py-2 rounded text-white text-sm shadow ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          } animate-fade-in-down`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}
