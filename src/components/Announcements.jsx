"use client";

import React, { useEffect, useState } from "react";
import {
  addAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  getAllAnnouncements,
} from "@/lib/firestore";

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    audience: "All",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch announcements on mount
  useEffect(() => {
    fetchAnnouncements();
  }, []);

  async function fetchAnnouncements() {
    setLoading(true);
    try {
      const data = await getAllAnnouncements();
      setAnnouncements(data);
    } catch (error) {
      alert("Error fetching announcements: " + error.message);
    }
    setLoading(false);
  }

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, message, audience } = formData;
    if (!title || !message) {
      alert("Please fill all fields");
      return;
    }
    setLoading(true);
    try {
      if (editingId) {
        // Update announcement
        await updateAnnouncement(editingId, { title, message, audience });
        alert("Announcement updated successfully!");
      } else {
        // Add new announcement
        await addAnnouncement(formData);
        alert("Announcement added successfully!");
      }
      setFormData({ title: "", message: "", audience: "All" });
      setEditingId(null);
      fetchAnnouncements();
    } catch (error) {
      alert("Failed to save announcement: " + error.message);
    }
    setLoading(false);
  };

  const handleEdit = (announcement) => {
    setFormData({
      title: announcement.title,
      message: announcement.message,
      audience: announcement.audience,
    });
    setEditingId(announcement.id);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this announcement?")) return;
    setLoading(true);
    try {
      await deleteAnnouncement(id);
      alert("Announcement deleted!");
      fetchAnnouncements();
    } catch (error) {
      alert("Failed to delete announcement: " + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Announcements / Notices</h2>

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter announcement title"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter announcement message"
            rows={4}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Audience</label>
          <select
            name="audience"
            value={formData.audience}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="All">All</option>
            <option value="Teachers">Teachers</option>
            <option value="Students">Students</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editingId ? "Update Announcement" : "Add Announcement"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setFormData({ title: "", message: "", audience: "All" });
            }}
            className="ml-4 px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>
        )}
      </form>

      <h3 className="text-xl font-semibold mb-2">All Announcements</h3>

      {loading && <p>Loading...</p>}

      {!loading && announcements.length === 0 && (
        <p>No announcements found.</p>
      )}

      {!loading && announcements.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Message</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Audience</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Posted At</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {announcements.map(({ id, title, message, audience, createdAt }) => (
                <tr key={id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{title}</td>
                  <td className="border border-gray-300 px-4 py-2">{message}</td>
                  <td className="border border-gray-300 px-4 py-2">{audience}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {createdAt?.toDate
                      ? createdAt.toDate().toLocaleString()
                      : "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center space-x-2">
                    <button
                      onClick={() =>
                        handleEdit({ id, title, message, audience })
                      }
                      className="bg-yellow-400 px-2 py-1 rounded hover:bg-yellow-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(id)}
                      className="bg-red-500 px-2 py-1 rounded text-white hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
