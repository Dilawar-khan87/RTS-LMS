"use client";

import { useEffect, useState } from "react";
import {
  collection,
  query,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  orderBy,
} from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { useAuth } from "@/context/authContext";  // your auth context

export default function SchoolEvents() {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ id: null, title: "", date: "", description: "" });

  // Fetch events from firestore
  const fetchEvents = async () => {
    if (!user) return; // user must be logged in

    setLoading(true);
    setError("");
    try {
      const q = query(collection(db, "events"), orderBy("date", "asc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setEvents(data);
    } catch (err) {
      setError("Failed to load events.");
      console.error("Error fetching events:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, [user]);

  // Handle form changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or update event
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in to add or update events.");
      return;
    }
    if (!form.title || !form.date) {
      setError("Title and Date are required.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      if (form.id) {
        // update existing
        const docRef = doc(db, "events", form.id);
        await updateDoc(docRef, {
          title: form.title,
          date: form.date,
          description: form.description,
        });
      } else {
        // add new
        await addDoc(collection(db, "events"), {
          title: form.title,
          date: form.date,
          description: form.description,
        });
      }
      setForm({ id: null, title: "", date: "", description: "" });
      fetchEvents();
    } catch (err) {
      setError("Failed to save event.");
      console.error("Error saving event:", err);
    }
    setLoading(false);
  };

  // Edit event (fill form)
  const handleEdit = (event) => {
    setForm({
      id: event.id,
      title: event.title,
      date: event.date,
      description: event.description || "",
    });
  };

  // Delete event
  const handleDelete = async (id) => {
    if (!user) {
      setError("You must be logged in to delete events.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await deleteDoc(doc(db, "events", id));
      fetchEvents();
    } catch (err) {
      setError("Failed to delete event.");
      console.error("Error deleting event:", err);
    }
    setLoading(false);
  };

  if (!user) {
    return <p className="p-6 text-red-600">Please login to view and manage events.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded mt-8">
      <h2 className="text-2xl font-bold mb-4">School Events Management</h2>

      {/* Error message */}
      {error && <p className="mb-4 text-red-600">{error}</p>}

      {/* Event Form */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Event Title"
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Event Description (optional)"
          className="w-full border border-gray-300 rounded px-3 py-2"
          rows={3}
        ></textarea>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {form.id ? "Update Event" : "Add Event"}
        </button>

        {form.id && (
          <button
            type="button"
            onClick={() => setForm({ id: null, title: "", date: "", description: "" })}
            className="ml-4 px-4 py-2 border rounded hover:bg-gray-200"
          >
            Cancel
          </button>
        )}
      </form>

      {/* Events List */}
      <h3 className="text-xl font-semibold mb-2">Upcoming Events</h3>
      {loading ? (
        <p>Loading events...</p>
      ) : events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <ul>
          {events.map((event) => (
            <li
              key={event.id}
              className="border border-gray-300 rounded p-4 mb-2 flex justify-between items-start"
            >
              <div>
                <h4 className="font-bold">{event.title}</h4>
                <p className="text-sm text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
                {event.description && <p className="mt-1">{event.description}</p>}
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(event)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(event.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
