'use client';

import { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase'; // Adjust path if needed
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

export default function TeacherProfileSettings() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cnic: '',
    address: '',
    assignedClass: '',
    role: 'teacher',
  });

  const [isChanged, setIsChanged] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const uid = auth.currentUser?.uid;

  useEffect(() => {
    async function fetchTeacherData() {
      if (!uid) return;

      try {
        const docRef = doc(db, 'users', uid);
        const snapshot = await getDoc(docRef);

        if (snapshot.exists()) {
          const data = snapshot.data();
          if (data.role === 'teacher') {
            setFormData((prev) => ({ ...prev, ...data }));
          }
        } else {
          const newTeacher = {
            ...formData,
            email: auth.currentUser?.email || '',
            role: 'teacher',
          };
          await setDoc(docRef, newTeacher);
          setFormData(newTeacher);
        }
      } catch (error) {
        console.error('Error fetching teacher data:', error);
      }

      setLoading(false);
    }

    fetchTeacherData();
  }, [uid]);

  const handleChange = (e) => {
    setIsChanged(true);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    if (!uid) return;
    setSaving(true);
    try {
      const docRef = doc(db, 'users', uid);
      await updateDoc(docRef, formData);
      alert('Profile updated successfully!');
      setIsChanged(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
    }
    setSaving(false);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-blue-500 h-16 w-16 animate-spin"></div>
      </div>
    );
    return (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg p-10">
      <h2 className="text-3xl font-bold text-blue-700 mb-10 text-center">
        Teacher Profile Settings
      </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (isChanged) handleSave();
        }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {/* Full Name */}
        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-gray-700">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter full name"
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email (read-only) */}
        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-gray-700">Email (read-only)</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            readOnly
            className="p-3 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-gray-700">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="e.g. 03001234567"
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* CNIC */}
        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-gray-700">CNIC</label>
          <input
            type="text"
            name="cnic"
            value={formData.cnic}
            onChange={handleChange}
            placeholder="e.g. 35202-1234567-1"
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Address */}
        <div className="flex flex-col md:col-span-2">
          <label className="mb-2 font-semibold text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter full address"
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Assigned Class */}
        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-gray-700">Assigned Class</label>
          <input
            type="text"
            name="assignedClass"
            value={formData.assignedClass}
            onChange={handleChange}
            placeholder="e.g. 6th Grade A"
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Button Centered */}
        <div className="col-span-1 md:col-span-3 flex justify-center mt-6">
          <button
            type="submit"
            disabled={!isChanged || saving}
            className={`px-8 py-3 rounded-md text-white font-semibold transition ${
              isChanged && !saving
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {saving ? 'Saving...' : isChanged ? 'Update Profile' : 'Saved'}
          </button>
        </div>
      </form>
    </div>
  </div>
);


  // return (
  //   <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-lg mt-10">
  //     <h2 className="text-3xl font-extrabold text-blue-700 mb-8 text-center tracking-wide">
  //       Teacher Profile Settings
  //     </h2>

  //     <form
  //       onSubmit={(e) => {
  //         e.preventDefault();
  //         if (isChanged) handleSave();
  //       }}
  //       className="grid grid-cols-1 md:grid-cols-2 gap-6"
  //     >
  //       {/* Full Name */}
  //       <div className="flex flex-col">
  //         <label className="mb-2 font-semibold text-gray-700">Full Name</label>
  //         <input
  //           type="text"
  //           name="name"
  //           value={formData.name}
  //           onChange={handleChange}
  //           required
  //           placeholder="Enter full name"
  //           className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
  //         />
  //       </div>

  //       {/* Email (read-only) */}
  //       <div className="flex flex-col">
  //         <label className="mb-2 font-semibold text-gray-700">Email (read-only)</label>
  //         <input
  //           type="email"
  //           name="email"
  //           value={formData.email}
  //           readOnly
  //           className="border border-gray-300 rounded-md p-3 bg-gray-100 cursor-not-allowed"
  //         />
  //       </div>

  //       {/* Phone Number */}
  //       <div className="flex flex-col">
  //         <label className="mb-2 font-semibold text-gray-700">Phone Number</label>
  //         <input
  //           type="tel"
  //           name="phone"
  //           value={formData.phone}
  //           onChange={handleChange}
  //           placeholder="e.g. 03001234567"
  //           className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
  //         />
  //       </div>

  //       {/* CNIC */}
  //       <div className="flex flex-col">
  //         <label className="mb-2 font-semibold text-gray-700">CNIC</label>
  //         <input
  //           type="text"
  //           name="cnic"
  //           value={formData.cnic}
  //           onChange={handleChange}
  //           placeholder="e.g. 35202-1234567-1"
  //           className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
  //         />
  //       </div>

  //       {/* Address */}
  //       <div className="flex flex-col md:col-span-2">
  //         <label className="mb-2 font-semibold text-gray-700">Address</label>
  //         <input
  //           type="text"
  //           name="address"
  //           value={formData.address}
  //           onChange={handleChange}
  //           placeholder="Enter full address"
  //           className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
  //         />
  //       </div>

  //       {/* Assigned Class */}
  //       <div className="flex flex-col md:col-span-2">
  //         <label className="mb-2 font-semibold text-gray-700">Assigned Class</label>
  //         <input
  //           type="text"
  //           name="assignedClass"
  //           value={formData.assignedClass}
  //           onChange={handleChange}
  //           placeholder="e.g. 6th Grade A"
  //           className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
  //         />
  //       </div>

  //       {/* Save Button */}
  //       <div className="md:col-span-2 flex justify-end">
  //         <button
  //           type="submit"
  //           disabled={!isChanged || saving}
  //           className={`px-6 py-3 rounded-md text-white font-semibold transition ${
  //             isChanged && !saving
  //               ? 'bg-blue-600 hover:bg-blue-700'
  //               : 'bg-gray-400 cursor-not-allowed'
  //           }`}
  //         >
  //           {saving ? 'Saving...' : isChanged ? 'Update Profile' : 'Saved'}
  //         </button>
  //       </div>
  //     </form>
  //   </div>
  // );
}


// 'use client';

// import { useEffect, useState } from 'react';
// import { auth, db } from '@/lib/firebase'; // make sure path is correct
// import {
//   doc,
//   getDoc,
//   setDoc,
//   updateDoc,
// } from 'firebase/firestore';

// export default function TeacherProfileSettings() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     cnic: '',
//     address: '',
//     assignedClass: '',
//     role: 'teacher',
//   });

//   const [isChanged, setIsChanged] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const uid = auth.currentUser?.uid;

//   const fetchTeacherData = async () => {
//     if (!uid) return;

//     const docRef = doc(db, 'users', uid);
//     const snapshot = await getDoc(docRef);

//     if (snapshot.exists()) {
//       const data = snapshot.data();
//       if (data.role === 'teacher') {
//         setFormData(data);
//       }
//     } else {
//       // initialize empty teacher record
//       await setDoc(docRef, {
//         ...formData,
//         email: auth.currentUser?.email || '',
//       });
//     }

//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchTeacherData();
//   }, [uid]);

//   const handleChange = (e) => {
//     setIsChanged(true);
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSave = async () => {
//     if (!uid) return;
//     const docRef = doc(db, 'users', uid);
//     await updateDoc(docRef, formData);
//     alert('Profile updated successfully!');
//     setIsChanged(false);
//   };

//   if (loading) return <p className="p-4">Loading...</p>;

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-6">
//       <h2 className="text-2xl font-bold mb-6">Teacher Profile Settings</h2>

//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="block font-medium">Full Name</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full border p-2 rounded mt-1"
//           />
//         </div>

//         <div>
//           <label className="block font-medium">Email (read-only)</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             readOnly
//             className="w-full border p-2 rounded mt-1 bg-gray-100"
//           />
//         </div>

//         <div>
//           <label className="block font-medium">Phone Number</label>
//           <input
//             type="text"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             className="w-full border p-2 rounded mt-1"
//           />
//         </div>

//         <div>
//           <label className="block font-medium">CNIC</label>
//           <input
//             type="text"
//             name="cnic"
//             value={formData.cnic}
//             onChange={handleChange}
//             className="w-full border p-2 rounded mt-1"
//           />
//         </div>

//         <div className="col-span-2">
//           <label className="block font-medium">Address</label>
//           <input
//             type="text"
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//             className="w-full border p-2 rounded mt-1"
//           />
//         </div>

//         <div className="col-span-2">
//           <label className="block font-medium">Assigned Class</label>
//           <input
//             type="text"
//             name="assignedClass"
//             value={formData.assignedClass}
//             onChange={handleChange}
//             className="w-full border p-2 rounded mt-1"
//           />
//         </div>
//       </div>

//       <button
//         onClick={handleSave}
//         disabled={!isChanged}
//         className={`mt-6 px-6 py-2 rounded text-white ${isChanged ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
//       >
//         {isChanged ? 'Update' : 'Save'}
//       </button>
//     </div>
//   );
// }
// // ---------------

// // --// ---------------
// // --// ---------------
// // 'use client';

// // import { useEffect, useState } from 'react';
// // import { auth, db } from '../firebase'; // adjust the path as needed
// // import {
// //   doc,
// //   getDoc,
// //   setDoc,
// //   updateDoc,
// // } from 'firebase/firestore';

// // export default function TeacherProfileSettings() {
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     email: '',
// //     phone: '',
// //     cnic: '',
// //     address: '',
// //     assignedClass: '',
// //     role: 'teacher',
// //   });

// //   const [isChanged, setIsChanged] = useState(false);
// //   const [loading, setLoading] = useState(true);
// //   const uid = auth.currentUser?.uid;

// //   const fetchTeacherData = async () => {
// //     if (!uid) return;

// //     const docRef = doc(db, 'users', uid);
// //     const snapshot = await getDoc(docRef);

// //     if (snapshot.exists()) {
// //       const data = snapshot.data();
// //       if (data.role === 'teacher') {
// //         setFormData({
// //           ...formData,
// //           ...data,
// //         });
// //       }
// //     } else {
// //       // if no document exists, create one for current user
// //       const newTeacher = {
// //         ...formData,
// //         email: auth.currentUser?.email || '',
// //         role: 'teacher',
// //       };
// //       await setDoc(docRef, newTeacher);
// //       setFormData(newTeacher);
// //     }

// //     setLoading(false);
// //   };

// //   useEffect(() => {
// //     fetchTeacherData();
// //   }, [uid]);

// //   const handleChange = (e) => {
// //     setIsChanged(true);
// //     setFormData({
// //       ...formData,
// //       [e.target.name]: e.target.value,
// //     });
// //   };

// //   const handleSave = async () => {
// //     if (!uid) return;

// //     const userRef = doc(db, 'users', uid);

// //     await setDoc(userRef, {
// //       ...formData,
// //       role: 'teacher',
// //     }, { merge: true }); // merge: only updates changed fields

// //     alert('Profile updated successfully!');
// //     setIsChanged(false);
// //   };

// //   if (loading) return <p className="p-4">Loading...</p>;

// //   return (
// //     <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-6">
// //       <h2 className="text-2xl font-bold mb-6">Teacher Profile Settings</h2>

// //       <div className="grid grid-cols-2 gap-4">
// //         <div>
// //           <label className="block font-medium">Full Name</label>
// //           <input
// //             type="text"
// //             name="name"
// //             value={formData.name}
// //             onChange={handleChange}
// //             className="w-full border p-2 rounded mt-1"
// //           />
// //         </div>

// //         <div>
// //           <label className="block font-medium">Email (read-only)</label>
// //           <input
// //             type="email"
// //             name="email"
// //             value={formData.email}
// //             readOnly
// //             className="w-full border p-2 rounded mt-1 bg-gray-100"
// //           />
// //         </div>

// //         <div>
// //           <label className="block font-medium">Phone Number</label>
// //           <input
// //             type="text"
// //             name="phone"
// //             value={formData.phone}
// //             onChange={handleChange}
// //             className="w-full border p-2 rounded mt-1"
// //           />
// //         </div>

// //         <div>
// //           <label className="block font-medium">CNIC</label>
// //           <input
// //             type="text"
// //             name="cnic"
// //             value={formData.cnic}
// //             onChange={handleChange}
// //             className="w-full border p-2 rounded mt-1"
// //           />
// //         </div>

// //         <div className="col-span-2">
// //           <label className="block font-medium">Address</label>
// //           <input
// //             type="text"
// //             name="address"
// //             value={formData.address}
// //             onChange={handleChange}
// //             className="w-full border p-2 rounded mt-1"
// //           />
// //         </div>

// //         <div className="col-span-2">
// //           <label className="block font-medium">Assigned Class</label>
// //           <input
// //             type="text"
// //             name="assignedClass"
// //             value={formData.assignedClass}
// //             onChange={handleChange}
// //             className="w-full border p-2 rounded mt-1"
// //           />
// //         </div>
// //       </div>

// //       <button
// //         onClick={handleSave}
// //         disabled={!isChanged}
// //         className={`mt-6 px-6 py-2 rounded text-white ${
// //           isChanged ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
// //         }`}
// //       >
// //         {isChanged ? 'Update' : 'Save'}
// //       </button>
// //     </div>
// //   );
// // }
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// working code is below
// 'use client';

// import { useEffect, useState } from 'react';
// import { auth, db } from '@/lib/firebase'; // Ensure path is correct
// import {
//   doc,
//   getDoc,
//   setDoc,
//   updateDoc,
// } from 'firebase/firestore';

// export default function TeacherProfileSettings() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     cnic: '',
//     address: '',
//     assignedClass: '',
//     role: 'teacher',
//   });

//   const [isChanged, setIsChanged] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   const uid = auth.currentUser?.uid;

//   // Fetch teacher data on mount
//   useEffect(() => {
//     async function fetchTeacherData() {
//       if (!uid) return;

//       try {
//         const docRef = doc(db, 'users', uid);
//         const snapshot = await getDoc(docRef);

//         if (snapshot.exists()) {
//           const data = snapshot.data();
//           if (data.role === 'teacher') {
//             setFormData((prev) => ({ ...prev, ...data }));
//           }
//         } else {
//           // create initial teacher doc if not exists
//           const newTeacher = {
//             ...formData,
//             email: auth.currentUser?.email || '',
//             role: 'teacher',
//           };
//           await setDoc(docRef, newTeacher);
//           setFormData(newTeacher);
//         }
//       } catch (error) {
//         console.error('Error fetching teacher data:', error);
//       }
//       setLoading(false);
//     }

//     fetchTeacherData();
//   }, [uid]);

//   const handleChange = (e) => {
//     setIsChanged(true);
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSave = async () => {
//     if (!uid) return;
//     setSaving(true);
//     try {
//       const docRef = doc(db, 'users', uid);
//       await updateDoc(docRef, formData);
//       alert('Profile updated successfully!');
//       setIsChanged(false);
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       alert('Failed to update profile.');
//     }
//     setSaving(false);
//   };

//   if (loading)
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
//       </div>
//     );

//   return (
//     <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-lg mt-10">
//       <h2 className="text-3xl font-extrabold text-blue-700 mb-8 text-center tracking-wide">
//         Teacher Profile Settings
//       </h2>

//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           if (isChanged) handleSave();
//         }}
//         className="grid grid-cols-1 md:grid-cols-2 gap-6"
//       >
//         {/* Name */}
//         <div className="flex flex-col">
//           <label className="mb-2 font-semibold text-gray-700">Full Name</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//             placeholder="Enter full name"
//             className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//           />
//         </div>

//         {/* Email (read-only) */}
//         <div className="flex flex-col">
//           <label className="mb-2 font-semibold text-gray-700">Email (read-only)</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             readOnly
//             className="border border-gray-300 rounded-md p-3 bg-gray-100 cursor-not-allowed"
//           />
//         </div>

//         {/* Phone Number */}
//         <div className="flex flex-col">
//           <label className="mb-2 font-semibold text-gray-700">Phone Number</label>
//           <input
//             type="tel"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             placeholder="e.g. 03001234567"
//             className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//           />
//         </div>

//         {/* CNIC */}
//         <div className="flex flex-col">
//           <label className="mb-2 font-semibold text-gray-700">CNIC</label>
//           <input
//             type="text"
//             name="cnic"
//             value={formData.cnic}
//             onChange={handleChange}
//             placeholder="e.g. 35202-1234567-1"
//             className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//           />
//         </div>

//         {/* Address - full width */}
//         <div className="flex flex-col md:col-span-2">
//           <label className="mb-2 font-semibold text-gray-700">Address</label>
//           <input
//             type="text"
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//             placeholder="Enter full address"
//             className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//           />
//         </div>

//         {/* Assigned Class - full width */}
//         <div className="flex flex-col md:col-span-2">
//           <label className="mb-2 font-semibold text-gray-700">Assigned Class</label>
//           <input
//             type="text"
//             name="assignedClass"
//             value={formData.assignedClass}
//             onChange={handleChange}
//             placeholder="e.g. 9th Grade"
//             className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//           />
//         </div>

//         {/* Submit Button full width */}
//         <div className="md:col-span-2 flex justify-center mt-6">
//           <button
//             type="submit"
//             disabled={!isChanged || saving}
//             className={`w-full max-w-xs py-3 rounded-lg text-white font-semibold tracking-wide 
//               transition
//               ${
//                 isChanged && !saving
//                   ? 'bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 shadow-lg'
//                   : 'bg-gray-400 cursor-not-allowed'
//               }
//               flex justify-center items-center gap-2
//             `}
//           >
//             {saving ? (
//               <svg
//                 className="animate-spin h-5 w-5 text-white"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <circle
//                   className="opacity-25"
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                 ></circle>
//                 <path
//                   className="opacity-75"
//                   fill="currentColor"
//                   d="M4 12a8 8 0 018-8v8H4z"
//                 ></path>
//               </svg>
//             ) : null}
//             {isChanged ? 'Update' : 'Save'}
//           </button>
//         </div>
//       </form>

//       <style>{`
//         /* Loader CSS */
//         .loader {
//           border-top-color: #3498db;
//           animation: spin 1s ease-in-out infinite;
//         }
//         @keyframes spin {
//           to { transform: rotate(360deg); }
//         }
//       `}</style>
//     </div>
//   );
// }
// working code ends here
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%