'use client';
import { useEffect, useState } from "react";
import { getFirestore, collection, query, orderBy, getDocs } from "firebase/firestore";
import { app } from "@/lib/firebase";
import { BookOpenCheck } from "lucide-react";

const AssignmentsForStudents = () => {
  const db = getFirestore(app);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignments = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, "assignments"), orderBy("title", "asc"));
        const querySnapshot = await getDocs(q);
        const list = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAssignments(list);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
      setLoading(false);
    };

    fetchAssignments();
  }, []);

  if (loading) return <p className="text-center text-blue-500 mt-10 animate-pulse">Loading assignments...</p>;
  if (assignments.length === 0) return <p className="text-center text-gray-500 mt-10">No assignments available.</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-extrabold text-blue-800 tracking-tight">📝 Assignments & Homework</h2>
        <p className="text-gray-600 mt-2 text-lg">Stay updated with your latest tasks and deadlines!</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {assignments.map(({ id, title, description, subject, dueDate }) => (
          <div key={id} className="bg-white/70 backdrop-blur-md border border-gray-200 shadow-xl hover:shadow-2xl transition duration-300 rounded-2xl p-6">
            <div className="flex items-center mb-3 gap-3">
              <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
                <BookOpenCheck size={20} />
              </div>
              <h3 className="text-xl font-bold text-gray-800">{title}</h3>
            </div>
            <p className="text-gray-700 mb-2">{description}</p>
            <p className="text-sm text-gray-500">📘 Subject: <span className="font-medium">{subject}</span></p>
            {dueDate && (
              <p className="text-sm text-right text-gray-500 italic mt-3">
                Due by: {new Date(dueDate.seconds * 1000).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssignmentsForStudents;
