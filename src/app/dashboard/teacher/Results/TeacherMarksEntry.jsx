'use client';

import React, { useEffect, useState } from 'react';
import { db } from '@/lib/firebase'; // path adjust kar lena
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';

export default function TeacherMarksEntry() {
  const [rollNo, setRollNo] = useState('');
  const [subject1, setSubject1] = useState('');
  const [subject2, setSubject2] = useState('');
  const [subject3, setSubject3] = useState('');
  const [marksList, setMarksList] = useState([]);
  const [editId, setEditId] = useState(null);

  const marksRef = collection(db, 'student_results');

  const fetchData = async () => {
    const snapshot = await getDocs(marksRef);
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setMarksList(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async () => {
    if (!rollNo || !subject1 || !subject2 || !subject3) return;

    const newData = {
      rollNo,
      subject1: Number(subject1),
      subject2: Number(subject2),
      subject3: Number(subject3),
    };

    if (editId) {
      const docRef = doc(db, 'student_results', editId);
      await updateDoc(docRef, newData);
      setEditId(null);
    } else {
      await addDoc(marksRef, newData);
    }

    setRollNo('');
    setSubject1('');
    setSubject2('');
    setSubject3('');
    fetchData();
  };

  const handleEdit = (id) => {
    const data = marksList.find(item => item.id === id);
    if (data) {
      setRollNo(data.rollNo);
      setSubject1(data.subject1.toString());
      setSubject2(data.subject2.toString());
      setSubject3(data.subject3.toString());
      setEditId(id);
    }
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'student_results', id));
    fetchData();
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-800">Enter Marks</h2>

      {/* Input Form - Card style */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8 border border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-5 mb-5">
          <input
            type="text"
            placeholder="Roll No"
            value={rollNo}
            onChange={e => setRollNo(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="English"
            value={subject1}
            onChange={e => setSubject1(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Computer"
            value={subject2}
            onChange={e => setSubject2(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Mathematics"
            value={subject3}
            onChange={e => setSubject3(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="bg-blue-700 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-800 transition"
        >
          {editId ? 'Update Marks' : 'Add Marks'}
        </button>
      </div>

      {/* Table - Card style */}
      <div className="bg-white shadow-lg rounded-lg border border-gray-200 overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse text-gray-700">
          <thead className="bg-blue-50 border-b border-blue-300">
            <tr>
              <th className="py-3 px-4 text-left font-semibold text-blue-700">Roll No</th>
              <th className="py-3 px-4 text-center font-semibold text-blue-700">English</th>
              <th className="py-3 px-4 text-center font-semibold text-blue-700">Computer</th>
              <th className="py-3 px-4 text-center font-semibold text-blue-700">Mathematics</th>
              <th className="py-3 px-4 text-center font-semibold text-blue-700">Total</th>
              <th className="py-3 px-4 text-center font-semibold text-blue-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[...marksList]
              .map(item => ({
                ...item,
                total: item.subject1 + item.subject2 + item.subject3,
              }))
              .sort((a, b) => b.total - a.total)
              .map(item => (
                <tr
                  key={item.id}
                  className="border-b border-gray-100 hover:bg-blue-50 transition"
                >
                  <td className="px-4 py-3">{item.rollNo}</td>
                  <td className="text-center px-4 py-3">{item.subject1}</td>
                  <td className="text-center px-4 py-3">{item.subject2}</td>
                  <td className="text-center px-4 py-3">{item.subject3}</td>
                  <td className="text-center px-4 py-3 font-semibold text-blue-700">{item.total}</td>
                  <td className="text-center px-4 py-3">
                    <div className="inline-flex space-x-3 justify-center">
                      <button
                        onClick={() => handleEdit(item.id)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-md shadow-sm transition"
                        aria-label="Edit Marks"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md shadow-sm transition"
                        aria-label="Delete Marks"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            {marksList.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-400 italic">
                  No records added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}



// 'use client';

// import React, { useEffect, useState } from 'react';
// import { db } from '@/lib/firebase'; // apne path ke hisaab se adjust kar lena
// import {
//   collection,
//   addDoc,
//   getDocs,
//   updateDoc,
//   deleteDoc,
//   doc,
// } from 'firebase/firestore';

// export default function TeacherMarksEntry() {
//   const [rollNo, setRollNo] = useState('');
//   const [subject1, setSubject1] = useState('');
//   const [subject2, setSubject2] = useState('');
//   const [subject3, setSubject3] = useState('');
//   const [marksList, setMarksList] = useState([]);
//   const [editId, setEditId] = useState(null);

//   const marksRef = collection(db, 'student_results');

//   // Firestore se data fetch karna
//   const fetchData = async () => {
//     const snapshot = await getDocs(marksRef);
//     const data = snapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//     setMarksList(data);
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // Submit ya update karne ka function
//   const handleSubmit = async () => {
//     if (!rollNo || !subject1 || !subject2 || !subject3) return;

//     const newData = {
//       rollNo,
//       subject1: Number(subject1),
//       subject2: Number(subject2),
//       subject3: Number(subject3),
//     };

//     if (editId) {
//       const docRef = doc(db, 'student_results', editId);
//       await updateDoc(docRef, newData);
//       setEditId(null);
//     } else {
//       await addDoc(marksRef, newData);
//     }

//     setRollNo('');
//     setSubject1('');
//     setSubject2('');
//     setSubject3('');
//     fetchData();
//   };

//   // Edit ke liye data load karna
//   const handleEdit = (id) => {
//     const data = marksList.find(item => item.id === id);
//     if (data) {
//       setRollNo(data.rollNo);
//       setSubject1(data.subject1.toString());
//       setSubject2(data.subject2.toString());
//       setSubject3(data.subject3.toString());
//       setEditId(id);
//     }
//   };

//   // Delete karna Firestore se
//   const handleDelete = async (id) => {
//     await deleteDoc(doc(db, 'student_results', id));
//     fetchData();
//   };

//   return (
//     <div className="p-4 max-w-3xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Enter Marks</h2>

//       <div className="grid grid-cols-4 gap-4 mb-4">
//         <input
//           type="text"
//           placeholder="Roll No"
//           value={rollNo}
//           onChange={e => setRollNo(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <input
//           type="number"
//           placeholder="English"
//           value={subject1}
//           onChange={e => setSubject1(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <input
//           type="number"
//           placeholder="Computer"
//           value={subject2}
//           onChange={e => setSubject2(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <input
//           type="number"
//           placeholder="Mathematics"
//           value={subject3}
//           onChange={e => setSubject3(e.target.value)}
//           className="border p-2 rounded"
//         />
//       </div>

//       <button
//         onClick={handleSubmit}
//         className="bg-blue-600 text-white px-4 py-2 rounded mb-6 hover:bg-blue-700"
//       >
//         {editId ? 'Update Marks' : 'Add Marks'}
//       </button>

//       <table className="w-full border text-sm">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="border px-2 py-1">Roll No</th>
//             <th className="border px-2 py-1">English</th>
//             <th className="border px-2 py-1">Computer</th>
//             <th className="border px-2 py-1">Mathematics</th>
//             <th className="border px-2 py-1">Total</th>
//             <th className="border px-2 py-1">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {[...marksList]
//             .map(item => ({
//               ...item,
//               total: item.subject1 + item.subject2 + item.subject3
//             }))
//             .sort((a, b) => b.total - a.total) // ascending order by total
//             .map(item => (
//               <tr key={item.id} className="text-center hover:bg-gray-50">
//                 <td className="border px-2 py-1">{item.rollNo}</td>
//                 <td className="border px-2 py-1">{item.subject1}</td>
//                 <td className="border px-2 py-1">{item.subject2}</td>
//                 <td className="border px-2 py-1">{item.subject3}</td>
//                 <td className="border px-2 py-1 font-semibold">{item.total}</td>
//                 <td className="border px-2 py-1 space-x-2">
//                   <button
//                     onClick={() => handleEdit(item.id)}
//                     className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(item.id)}
//                     className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           {marksList.length === 0 && (
//             <tr>
//               <td colSpan={6} className="text-center py-4 text-gray-400">
//                 No records added yet.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }
