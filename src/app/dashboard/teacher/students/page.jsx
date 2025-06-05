'use client';
import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '@/lib/firebase';

const AllStudentsTable = () => {
  const [students, setStudents] = useState([]);
  const db = getFirestore(app);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const snap = await getDocs(collection(db, 'students'));
        const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setStudents(data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-8 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6">All Students</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full text-gray-700 border border-gray-300 rounded-md">
          <thead className="bg-blue-50 text-blue-700 uppercase text-xs font-semibold tracking-wide border-b border-blue-200">
            <tr>
              <th className="px-6 py-3 text-left border-r border-blue-200">S.no</th>
              <th className="px-6 py-3 text-left border-r border-blue-200">Name</th>
              <th className="px-6 py-3 text-left border-r border-blue-200">Class</th>
              <th className="px-6 py-3 text-left">Roll No</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-8 text-gray-400 italic">
                  No students found.
                </td>
              </tr>
            ) : (
              students.map((student, index) => (
                <tr
                  key={student.id}
                  className="hover:bg-blue-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 border-r border-blue-100">{index + 1}</td>
                  <td className="px-6 py-4 border-r border-blue-100 font-medium">{student.name}</td>
                  <td className="px-6 py-4 border-r border-blue-100">{student.class}</td>
                  <td className="px-6 py-4">{student.rollNumber}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllStudentsTable;


// 'use client';
// import React, { useEffect, useState } from 'react';
// import { getFirestore, collection, getDocs } from 'firebase/firestore';
// import { app } from '@/lib/firebase';

// const AllStudentsTable = () => {
//   const [students, setStudents] = useState([]);
//   const db = getFirestore(app);

//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const snap = await getDocs(collection(db, 'students'));
//         const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         setStudents(data);
//       } catch (error) {
//         console.error('Error fetching students:', error);
//       }
//     };

//     fetchStudents();
//   }, []);

//   const getFeeStatusBadge = (status) => {
//     const base = 'px-2 py-1 rounded-full text-xs font-semibold';
//     if (status === 'paid') {
//       return <span className={`${base} bg-green-100 text-green-800`}>Paid</span>;
//     }
//     return <span className={`${base} bg-red-100 text-red-700`}>Unpaid</span>;
//   };

//   return (
//     <div className="bg-white shadow-md rounded-xl p-6 mt-6">
//       <h2 className="text-2xl font-bold text-gray-700 mb-4">All Students</h2>
//       <div className="overflow-x-auto">
//         <table className="min-w-full text-sm text-left text-gray-700 border border-gray-200">
//           <thead className="bg-blue-100 text-gray-600 uppercase text-xs tracking-wider">
//             <tr>
//               <th className="px-6 py-3 border">S.no</th>
//               <th className="px-6 py-3 border">Name</th>
//               <th className="px-6 py-3 border">Class</th>
//               <th className="px-6 py-3 border">Roll No</th>
//               {/* <th className="px-6 py-3 border">Phone</th> */}
//               {/* <th className="px-6 py-3 border">Fee Status</th> */}
//             </tr>
//           </thead>
//           <tbody>
//             {students.map(student => (
//               <tr
//                 key={student.id}
//                 className="hover:bg-blue-50 transition duration-200"
//               >
//                 <td className="px-6 py-3 border">
//                 {/* write code to generate numbers from 1 to number of available students */}
//                   {students.indexOf(student) + 1}
//                   {/* . {student.name} */}

//                 </td>
//                 <td className="px-6 py-3 border">{student.name}</td>
//                 <td className="px-6 py-3 border">{student.class}</td>
//                 <td className="px-6 py-3 border">{student.rollNumber}</td>
//                 {/* <td className="px-6 py-3 border">{student.phone}</td> */}
//                 {/* <td className="px-6 py-3 border">
//                   {getFeeStatusBadge(student.feeStatus)}
//                 </td> */}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AllStudentsTable;
