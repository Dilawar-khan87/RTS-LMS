"use client";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import StudentForm from "./StudentForm";

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "students"));
      const studentData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStudents(studentData);
    } catch (error) {
      console.error("Failed to fetch students:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleEdit = (student) => setSelectedStudent(student);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "students", id));
    fetchStudents();
  };

  return (
    <div className="mt-6">
      <StudentForm
        onSaved={fetchStudents}
        student={selectedStudent}
        clear={() => setSelectedStudent(null)}
      />

      {loading ? (
        <p>Loading students...</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          {students.map((student) => (
            <div key={student.id} className="border p-4 rounded shadow bg-white">
              <h3 className="font-bold text-lg">{student.name}</h3>
              <p>Class: {student.class} - Section: {student.section}</p>
              <p>Roll #: {student.rollNumber}</p>
              <p>Email: {student.email}</p>
              <p>Guardian: {student.guardianName}</p>
              <p>Contact: {student.contactNumber}</p>
              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => handleEdit(student)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(student.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
