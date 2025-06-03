"use client";
import { useEffect, useState } from "react";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function StudentForm({ onSaved, student, clear }) {
  const [formData, setFormData] = useState({
    name: "",
    class: "",
    section: "",
    rollNumber: "",
    email: "",
    guardianName: "",
    contactNumber: "",
  });

  useEffect(() => {
    if (student) setFormData(student);
    else setFormData({
      name: "",
      class: "",
      section: "",
      rollNumber: "",
      email: "",
      guardianName: "",
      contactNumber: "",
    });
  }, [student]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (student?.id) {
        await updateDoc(doc(db, "students", student.id), formData);
      } else {
        await addDoc(collection(db, "students"), formData);
      }
      onSaved();
      clear();
    } catch (error) {
      console.error("Failed to save student:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-blue-50 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">{student ? "Edit" : "Add"} Student</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {["name", "class", "section", "rollNumber", "email", "guardianName", "contactNumber"].map((field) => (
          <input
            key={field}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            placeholder={field.replace(/([A-Z])/g, " $1")}
            className="p-2 border rounded"
            required
          />
        ))}
      </div>

      <div className="mt-4 flex gap-4">
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          {student ? "Update" : "Add"}
        </button>
        {student && (
          <button onClick={clear} type="button" className="text-gray-600 underline">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
// This code defines a StudentForm component that allows adding or editing student records.