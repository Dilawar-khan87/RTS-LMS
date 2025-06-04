// 'use client';
// import { useEffect, useState } from "react";
// import { getFirestore, collection, query, orderBy, getDocs } from "firebase/firestore";
// import { app } from "@/lib/firebase";  // make sure this points to your Firebase app

// const AnnouncementsForStudents = () => {
//   const db = getFirestore(app);
//   const [announcements, setAnnouncements] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchAnnouncements = async () => {
//       setLoading(true);
//       try {
//         const q = query(collection(db, "announcements"), orderBy("createdAt", "desc"));
//         const querySnapshot = await getDocs(q);
//         const annList = querySnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setAnnouncements(annList);
//       } catch (error) {
//         console.error("Error fetching announcements:", error);
//       }
//       setLoading(false);
//     };

//     fetchAnnouncements();
//   }, []);

//   if (loading) return <p>Loading announcements...</p>;
//   if (announcements.length === 0) return <p>No announcements available.</p>;

//   return (
//     <div className="max-w-3xl mx-auto p-4 bg-white rounded shadow">
//       <h2 className="text-2xl font-bold mb-4">Announcements</h2>
//       <ul>
//         {announcements.map(({ id, title, message, createdAt }) => (
//           <li key={id} className="mb-4 border-b pb-3">
//             <h3 className="text-lg font-semibold">{title}</h3>
//             <p className="text-gray-700">{message}</p>
//             {createdAt && (
//               <p className="text-sm text-gray-500 mt-1">
//                 {new Date(createdAt.seconds * 1000).toLocaleDateString()}
//               </p>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default AnnouncementsForStudents;

'use client';
import { useEffect, useState } from "react";
import { getFirestore, collection, query, orderBy, getDocs } from "firebase/firestore";
import { app } from "@/lib/firebase";
import { Megaphone } from "lucide-react"; // Optional: You can use any icon here

const AnnouncementsForStudents = () => {
  const db = getFirestore(app);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, "announcements"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const annList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAnnouncements(annList);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
      setLoading(false);
    };

    fetchAnnouncements();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-blue-500 font-semibold mt-10 animate-pulse">
        Fetching announcements...
      </div>
    );
  }

  if (announcements.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10">
        No announcements available.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-extrabold text-blue-800 tracking-tight">
          📢 Announcements Board
        </h2>
        <p className="text-gray-600 mt-2 text-lg">Stay up to date with the latest school updates</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {announcements.map(({ id, title, message, createdAt }) => (
          <div
            key={id}
            className="bg-white/70 backdrop-blur-md border border-gray-200 shadow-xl hover:shadow-2xl transition duration-300 rounded-2xl p-6"
          >
            <div className="flex items-center mb-3 gap-3">
              <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
                <Megaphone size={20} />
              </div>
              <h3 className="text-xl font-bold text-gray-800">{title}</h3>
            </div>
            <p className="text-gray-700 text-base leading-relaxed mb-4">{message}</p>
            {createdAt && (
              <p className="text-sm text-right text-gray-500 italic">
                Posted on {new Date(createdAt.seconds * 1000).toLocaleDateString("en-GB", {
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

export default AnnouncementsForStudents;
