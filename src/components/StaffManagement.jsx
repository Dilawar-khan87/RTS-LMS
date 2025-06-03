"use client";

import { useEffect, useState } from "react";
import { db, auth } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
  updateDoc,
} from "firebase/firestore";

export default function StaffManagement() {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // For add/edit form
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    email: "",
    role: "teacher", // default role
  });
  const [formError, setFormError] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  // Fetch staff (teachers and clerks)
  async function fetchStaff() {
    setLoading(true);
    setError(null);
    try {
      const staffQuery = query(
        collection(db, "users"),
        where("role", "in", ["teacher", "clerk"])
      );
      const snapshot = await getDocs(staffQuery);
      const staffData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStaffList(staffData);
    } catch (err) {
      setError("Failed to fetch staff");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStaff();
  }, []);

  // Delete staff member
  async function handleDelete(id) {
    if (!confirm("Are you sure you want to remove this staff member?")) return;

    try {
      await deleteDoc(doc(db, "users", id));
      setStaffList((prev) => prev.filter((staff) => staff.id !== id));
    } catch (err) {
      alert("Failed to delete staff member");
      console.error(err);
    }
  }

  // Handle form input changes
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  // Submit Add/Edit form
  async function handleSubmit(e) {
    e.preventDefault();
    setFormError(null);
    setFormLoading(true);

    const { id, name, email, role } = formData;

    if (!name.trim() || !email.trim() || !role) {
      setFormError("Please fill in all fields.");
      setFormLoading(false);
      return;
    }

    try {
      if (id) {
        // Editing existing staff
        const staffRef = doc(db, "users", id);
        await updateDoc(staffRef, { name, email, role });
        setStaffList((prev) =>
          prev.map((staff) =>
            staff.id === id ? { ...staff, name, email, role } : staff
          )
        );
        alert("Staff updated successfully!");
      } else {
        // Adding new staff
        // NOTE: This just adds to Firestore users collection.
        // For actual login credentials, user must sign up separately.
        const staffCollection = collection(db, "users");
        const docRef = await addDoc(staffCollection, {
          name,
          email,
          role,
          createdAt: new Date(),
        });
        setStaffList((prev) => [
          ...prev,
          { id: docRef.id, name, email, role },
        ]);
        alert("Staff added successfully!");
      }

      // Reset form
      setFormData({ id: null, name: "", email: "", role: "teacher" });
    } catch (err) {
      console.error(err);
      setFormError("Failed to save staff data.");
    } finally {
      setFormLoading(false);
    }
  }

  // Set form for editing
  function handleEdit(staff) {
    setFormData({
      id: staff.id,
      name: staff.name,
      email: staff.email,
      role: staff.role,
    });
  }

  if (loading) return <p>Loading staff...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Staff List (Teachers & Clerks)</h3>

      {/* Add/Edit Staff Form */}
      <form
        onSubmit={handleSubmit}
        className="mb-8 p-4 border border-gray-300 rounded shadow-sm max-w-xl mx-auto"
      >
        <h4 className="text-lg font-semibold mb-3">
          {formData.id ? "Edit Staff" : "Add New Staff"}
        </h4>

        {formError && (
          <p className="mb-3 text-red-600 font-semibold">{formError}</p>
        )}

        <label className="block mb-2">
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </label>

        <label className="block mb-2">
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </label>

        <label className="block mb-4">
          Role:
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="teacher">Teacher</option>
            <option value="clerk">Clerk</option>
          </select>
        </label>

        <button
          type="submit"
          disabled={formLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {formLoading ? "Saving..." : formData.id ? "Update Staff" : "Add Staff"}
        </button>

        {formData.id && (
          <button
            type="button"
            onClick={() =>
              setFormData({ id: null, name: "", email: "", role: "teacher" })
            }
            className="ml-3 px-4 py-2 border border-gray-400 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
        )}
      </form>

      {/* Staff Table */}
      <table className="min-w-full bg-white border border-gray-300 rounded shadow-sm">
        <thead>
          <tr className="bg-blue-100 text-blue-900">
            <th className="p-2 border border-gray-300">Name</th>
            <th className="p-2 border border-gray-300">Email</th>
            <th className="p-2 border border-gray-300">Role</th>
            <th className="p-2 border border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {staffList.map(({ id, name, email, role }) => (
            <tr key={id} className="text-center border border-gray-200">
              <td className="p-2 border border-gray-300">{name}</td>
              <td className="p-2 border border-gray-300">{email}</td>
              <td className="p-2 border border-gray-300 capitalize">{role}</td>
              <td className="p-2 border border-gray-300 space-x-2">
                <button
                  onClick={() => handleEdit({ id, name, email, role })}
                  className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
