'use client';
import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '@/lib/firebase';
import { FaChalkboardTeacher } from 'react-icons/fa';

const AllTeachersTable = () => {
  const db = getFirestore(app);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTeachers = async () => {
    try {
      const snap = await getDocs(collection(db, 'users'));
      const data = snap.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(user => user.role === 'teacher'); // Only teachers

      setTeachers(data);
    } catch (err) {
      console.error('Error fetching teachers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <FaChalkboardTeacher className="text-2xl text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-700">All Teachers</h2>
      </div>

      {loading ? (
        <p>Loading teachers...</p>
      ) : teachers.length === 0 ? (
        <p>No teachers found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden text-sm">
            <thead className="bg-blue-100 text-gray-700 uppercase text-left text-xs">
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Subject</th>
                <th className="px-4 py-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher) => (
                <tr key={teacher.id} className="hover:bg-gray-100 transition duration-200">
                  <td className="px-4 py-2 border">{teacher.name || 'N/A'}</td>
                  <td className="px-4 py-2 border">{teacher.email || 'N/A'}</td>
                  <td className="px-4 py-2 border">{teacher.subject || 'N/A'}</td>
                  <td className="px-4 py-2 border">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        teacher.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {teacher.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllTeachersTable;
