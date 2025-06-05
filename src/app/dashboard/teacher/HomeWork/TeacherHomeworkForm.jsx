'use client';

import React, { useEffect, useState } from 'react';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function TeacherHomeworkForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [marks, setMarks] = useState('');
  const [deadline, setDeadline] = useState('');
  const [homeworks, setHomeworks] = useState([]);
  const [editId, setEditId] = useState(null);

  const homeworkRef = collection(db, 'teacher_homework');

  const fetchHomework = async () => {
    const snapshot = await getDocs(homeworkRef);
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    const sorted = data.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds);
    setHomeworks(sorted);
  };

  useEffect(() => {
    fetchHomework();
  }, []);

  const handleSubmit = async () => {
    if (!title || !description || !marks || !deadline) return;

    const newData = {
      title,
      description,
      marks: Number(marks),
      deadline,
      createdAt: Timestamp.now(),
    };

    if (editId) {
      const docRef = doc(db, 'teacher_homework', editId);
      await updateDoc(docRef, newData);
      setEditId(null);
    } else {
      await addDoc(homeworkRef, newData);
    }

    setTitle('');
    setDescription('');
    setMarks('');
    setDeadline('');
    fetchHomework();
  };

  const handleEdit = (id) => {
    const data = homeworks.find(hw => hw.id === id);
    if (data) {
      setTitle(data.title);
      setDescription(data.description);
      setMarks(data.marks.toString());
      setDeadline(data.deadline);
      setEditId(id);
    }
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'teacher_homework', id));
    fetchHomework();
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-gray-800 mb-8">Assign Homework</h2>

      <form
        onSubmit={e => {
          e.preventDefault();
          handleSubmit();
        }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          required
        />
        <input
          type="number"
          placeholder="Marks"
          value={marks}
          onChange={e => setMarks(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          required
          min={0}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition md:col-span-2 resize-none h-24"
          required
        />
        <input
          type="date"
          value={deadline}
          onChange={e => setDeadline(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          required
          min={new Date().toISOString().split('T')[0]} // no past date
        />

        <button
          type="submit"
          className="md:col-span-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 rounded-md shadow-md hover:from-blue-700 hover:to-blue-800 transition"
        >
          {editId ? 'Update Homework' : 'Add Homework'}
        </button>
      </form>

      <h3 className="text-2xl font-semibold text-gray-800 mb-6">All Homeworks</h3>

      <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
        {/* <table className="min-w-full table-auto border-collapse text-gray-700">
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm font-semibold select-none">
            <tr>
              <th className="border px-4 py-3 text-center">#</th>
              <th className="border px-4 py-3 text-left">Title</th>
              <th className="border px-4 py-3 text-left">Description</th>
              <th className="border px-4 py-3 text-center">Marks</th>
              <th className="border px-4 py-3 text-center">Deadline</th>
              <th className="border px-4 py-3 text-center">Created At</th>
              <th className="border px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {homeworks.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-8 text-gray-400 italic">
                  No homework assigned yet.
                </td>
              </tr>
            )}
            {homeworks.map((hw, idx) => (
              <tr
                key={hw.id}
                className="hover:bg-blue-50 transition-colors duration-200 ease-in-out"
                style={{ animation: `fadeIn 0.3s ease forwards`, animationDelay: `${idx * 0.05}s` }}
              >
                <td className="border px-4 py-3 text-center">{idx + 1}</td>
                <td className="border px-4 py-3 font-medium">{hw.title}</td>
                <td className="border px-4 py-3 truncate max-w-xs" title={hw.description}>{hw.description}</td>
                <td className="border px-4 py-3 text-center">{hw.marks}</td>
                <td className="border px-4 py-3 text-center">{hw.deadline}</td>
                <td className="border px-4 py-3 text-center text-xs text-gray-500">
                  {hw.createdAt?.toDate().toLocaleString()}
                </td>
                <td className="border px-4 py-3 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(hw.id)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-md shadow-sm transition"
                    aria-label="Edit Homework"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(hw.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md shadow-sm transition"
                    aria-label="Delete Homework"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}
        <div className="bg-white shadow-md rounded-xl p-6 mt-6 overflow-x-auto">
  <table className="min-w-full text-sm text-left text-gray-700 border border-gray-200">
    <thead className="bg-blue-100 text-blue-700 uppercase text-xs font-semibold tracking-wide">
      <tr>
        <th className="px-6 py-3 border text-center">#</th>
        <th className="px-6 py-3 border">Title</th>
        <th className="px-6 py-3 border">Description</th>
        <th className="px-6 py-3 border text-center">Marks</th>
        <th className="px-6 py-3 border text-center">Deadline</th>
        <th className="px-6 py-3 border text-center">Created At</th>
        <th className="px-6 py-3 border text-center">Actions</th>
      </tr>
    </thead>
    <tbody>
      {homeworks.length === 0 && (
        <tr>
          <td colSpan="7" className="text-center py-8 text-gray-400 italic">
            No homework assigned yet.
          </td>
        </tr>
      )}
      {homeworks.map((hw, idx) => (
        <tr
          key={hw.id}
          className="hover:bg-blue-50 transition-colors border-b border-gray-200"
          style={{
            animation: `fadeIn 0.3s ease forwards`,
            animationDelay: `${idx * 0.05}s`,
          }}
        >
          <td className="px-6 py-3 text-center border">{idx + 1}</td>
          <td className="px-6 py-3 font-medium border">{hw.title}</td>
          <td
            className="px-6 py-3 truncate max-w-xs border"
            title={hw.description}
          >
            {hw.description}
          </td>
          <td className="px-6 py-3 text-center border">{hw.marks}</td>
          <td className="px-6 py-3 text-center border">{hw.deadline}</td>
          <td className="px-6 py-3 text-center text-xs text-gray-500 border">
            {hw.createdAt?.toDate().toLocaleString()}
          </td>
          <td className="px-6 py-3 text-center border">
            <div className="inline-flex space-x-3 justify-center">
              <button
                onClick={() => handleEdit(hw.id)}
                className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-md shadow-sm transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(hw.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md shadow-sm transition"
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}


// 'use client';

// import React, { useEffect, useState } from 'react';
// import {
//   collection,
//   addDoc,
//   getDocs,
//   updateDoc,
//   deleteDoc,
//   doc,
//   Timestamp
// } from 'firebase/firestore';
// import { db } from '@/lib/firebase'; // change path if needed

// export default function TeacherHomeworkForm() {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [marks, setMarks] = useState('');
//   const [deadline, setDeadline] = useState('');
//   const [homeworks, setHomeworks] = useState([]);
//   const [editId, setEditId] = useState(null);

//   const homeworkRef = collection(db, 'teacher_homework');

//   const fetchHomework = async () => {
//     const snapshot = await getDocs(homeworkRef);
//     const data = snapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//     // sort by createdAt descending
//     const sorted = data.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds);
//     setHomeworks(sorted);
//   };

//   useEffect(() => {
//     fetchHomework();
//   }, []);

//   const handleSubmit = async () => {
//     if (!title || !description || !marks || !deadline) return;

//     const newData = {
//       title,
//       description,
//       marks: Number(marks),
//       deadline,
//       createdAt: Timestamp.now(),
//     };

//     if (editId) {
//       const docRef = doc(db, 'teacher_homework', editId);
//       await updateDoc(docRef, newData);
//       setEditId(null);
//     } else {
//       await addDoc(homeworkRef, newData);
//     }

//     setTitle('');
//     setDescription('');
//     setMarks('');
//     setDeadline('');
//     fetchHomework();
//   };

//   const handleEdit = (id) => {
//     const data = homeworks.find(hw => hw.id === id);
//     if (data) {
//       setTitle(data.title);
//       setDescription(data.description);
//       setMarks(data.marks.toString());
//       setDeadline(data.deadline);
//       setEditId(id);
//     }
//   };

//   const handleDelete = async (id) => {
//     await deleteDoc(doc(db, 'teacher_homework', id));
//     fetchHomework();
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Assign Homework</h2>

//       <div className="grid grid-cols-2 gap-4 mb-4">
//         <input
//           type="text"
//           placeholder="Title"
//           value={title}
//           onChange={e => setTitle(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <input
//           type="number"
//           placeholder="Marks"
//           value={marks}
//           onChange={e => setMarks(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <textarea
//           placeholder="Description"
//           value={description}
//           onChange={e => setDescription(e.target.value)}
//           className="border p-2 rounded col-span-2"
//         />
//         <input
//           type="date"
//           value={deadline}
//           onChange={e => setDeadline(e.target.value)}
//           className="border p-2 rounded"
//         />
//       </div>

//       <button
//         onClick={handleSubmit}
//         className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//       >
//         {editId ? 'Update Homework' : 'Add Homework'}
//       </button>

//       <h3 className="text-xl font-semibold mt-8 mb-4">All Homeworks</h3>

//       <table className="w-full border text-sm">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="border px-2 py-1">#</th>
//             <th className="border px-2 py-1">Title</th>
//             <th className="border px-2 py-1">Description</th>
//             <th className="border px-2 py-1">Marks</th>
//             <th className="border px-2 py-1">Deadline</th>
//             <th className="border px-2 py-1">Created At</th>
//             <th className="border px-2 py-1">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {homeworks.map((hw, index) => (
//             <tr key={hw.id} className="text-center hover:bg-gray-50">
//               <td className="border px-2 py-1">{index + 1}</td>
//               <td className="border px-2 py-1">{hw.title}</td>
//               <td className="border px-2 py-1">{hw.description}</td>
//               <td className="border px-2 py-1">{hw.marks}</td>
//               <td className="border px-2 py-1">{hw.deadline}</td>
//               <td className="border px-2 py-1 text-xs text-gray-600">
//                 {hw.createdAt?.toDate().toLocaleString()}
//               </td>
//               <td className="border px-2 py-1 space-x-2">
//                 <button
//                   onClick={() => handleEdit(hw.id)}
//                   className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(hw.id)}
//                   className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//           {homeworks.length === 0 && (
//             <tr>
//               <td colSpan="7" className="text-center py-4 text-gray-400">
//                 No homework assigned yet.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }
