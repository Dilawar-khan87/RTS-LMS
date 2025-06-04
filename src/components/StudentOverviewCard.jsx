"use client";

import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { app } from "@/lib/firebase";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    class: "",
    section: "",
    rollNo: "",
    profileImageURL: "",
  });
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false); // new state for edit mode

  const isProfileComplete = () => {
    if (!profile) return false;
    const requiredFields = ["name", "class", "section", "rollNo"];
    return requiredFields.every(
      (field) => profile[field] && profile[field].toString().trim() !== ""
    );
  };

  useEffect(() => {
    const auth = getAuth(app);
    const db = getFirestore(app);

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log("Fetched profile data:", data);
          setProfile(data);
          setFormData(data);
        } else {
          setProfile(null);
          setFormData({
            name: "",
            class: "",
            section: "",
            rollNo: "",
            profileImageURL: "",
          });
        }
      } else {
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    try {
      const db = getFirestore(app);
      const docRef = doc(db, "users", user.uid);
      await setDoc(docRef, formData, { merge: true });
      setProfile(formData); // update local profile
      setEditing(false); // exit editing mode
      alert("Profile saved successfully!");
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (!user) return <p>Please login to view your profile.</p>;

  return (
    <div className="max-w-md mx-auto p-6">
      {isProfileComplete() && !editing ? (
        <div className="bg-green-100 border border-green-400 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-green-800">
            Welcome, {profile.name}!
          </h2>
          {profile.profileImageURL && (
            <img
              src={profile.profileImageURL}
              alt="Profile"
              className="w-24 h-24 rounded-full mb-4 object-cover"
            />
          )}
          <ul className="text-green-900 space-y-1">
            <li><strong>Class:</strong> {profile.class}</li>
            <li><strong>Section:</strong> {profile.section}</li>
            <li><strong>Roll No:</strong> {profile.rollNo}</li>
          </ul>
          <button
            onClick={() => setEditing(true)}
            className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <h2 className="text-xl font-semibold mb-4">
            {isProfileComplete() ? "Edit Your Profile" : "Complete Your Profile"}
          </h2>

          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Class</label>
            <input
              type="text"
              name="class"
              value={formData.class}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Section</label>
            <input
              type="text"
              name="section"
              value={formData.section}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Roll No</label>
            <input
              type="text"
              name="rollNo"
              value={formData.rollNo}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Profile Image URL</label>
            <input
              type="url"
              name="profileImageURL"
              value={formData.profileImageURL}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Optional"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Profile"}
            </button>

            {isProfileComplete() && (
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default Profile;


// "use client";

// import { useState, useEffect } from "react";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
// import { app } from "@/lib/firebase";

// const Profile = () => {
//   const [user, setUser] = useState(null);
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [formData, setFormData] = useState({
//     name: "",
//     class: "",
//     section: "",
//     rollNo: "",
//     profileImageURL: "",
//   });
//   const [saving, setSaving] = useState(false);

//   // Profile completion check: ensure no empty strings or missing keys
//   const isProfileComplete = () => {
//     if (!profile) return false;
//     const requiredFields = ["name", "class", "section", "rollNo"];
//     return requiredFields.every(
//       (field) => profile[field] && profile[field].toString().trim() !== ""
//     );
//   };

//   useEffect(() => {
//     const auth = getAuth(app);
//     const db = getFirestore(app);

//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         setUser(user);
//         const docRef = doc(db, "students", user.uid);
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//           const data = docSnap.data();
//           console.log("Fetched profile data:", data);  // Debugging
//           setProfile(data);
//           setFormData(data);
//         } else {
//           setProfile(null);
//           setFormData({
//             name: "",
//             class: "",
//             section: "",
//             rollNo: "",
//             profileImageURL: "",
//           });
//         }
//       } else {
//         setUser(null);
//         setProfile(null);
//       }
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!user) return;

//     setSaving(true);
//     try {
//       const db = getFirestore(app);
//       const docRef = doc(db, "students", user.uid);
//       await setDoc(docRef, formData, { merge: true });
//       setProfile(formData); // Update local profile state after saving
//       alert("Profile updated successfully!");
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       alert("Failed to update profile.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) return <p>Loading profile...</p>;
//   if (!user) return <p>Please login to view your profile.</p>;

//   // Welcome card component
//   const WelcomeCard = () => (
//     <div className="max-w-md mx-auto bg-green-100 border border-green-400 p-6 rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-4 text-green-800">
//         Welcome, {profile.name}!
//       </h2>
//       {profile.profileImageURL && (
//         <img
//           src={profile.profileImageURL}
//           alt="Profile"
//           className="w-24 h-24 rounded-full mb-4 object-cover"
//         />
//       )}
//       <ul className="text-green-900 space-y-1">
//         <li><strong>Class:</strong> {profile.class}</li>
//         <li><strong>Section:</strong> {profile.section}</li>
//         <li><strong>Roll No:</strong> {profile.rollNo}</li>
//       </ul>
//       <p className="mt-4 text-green-700 font-semibold">Your profile is complete.</p>
//     </div>
//   );

//   return (
//     <div className="max-w-md mx-auto p-6">
//       {isProfileComplete() ? (
//         <WelcomeCard />
//       ) : (
//         <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
//           <h2 className="text-xl font-semibold mb-4">Complete Your Profile</h2>

//           <div>
//             <label className="block mb-1 font-medium">Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full border rounded px-3 py-2"
//               required
//             />
//           </div>

//           <div>
//             <label className="block mb-1 font-medium">Class</label>
//             <input
//               type="text"
//               name="class"
//               value={formData.class}
//               onChange={handleChange}
//               className="w-full border rounded px-3 py-2"
//               required
//             />
//           </div>

//           <div>
//             <label className="block mb-1 font-medium">Section</label>
//             <input
//               type="text"
//               name="section"
//               value={formData.section}
//               onChange={handleChange}
//               className="w-full border rounded px-3 py-2"
//               required
//             />
//           </div>

//           <div>
//             <label className="block mb-1 font-medium">Roll No</label>
//             <input
//               type="text"
//               name="rollNo"
//               value={formData.rollNo}
//               onChange={handleChange}
//               className="w-full border rounded px-3 py-2"
//               required
//             />
//           </div>

//           <div>
//             <label className="block mb-1 font-medium">Profile Image URL</label>
//             <input
//               type="url"
//               name="profileImageURL"
//               value={formData.profileImageURL}
//               onChange={handleChange}
//               className="w-full border rounded px-3 py-2"
//               placeholder="Optional"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={saving}
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
//           >
//             {saving ? "Saving..." : "Save Profile"}
//           </button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default Profile;
