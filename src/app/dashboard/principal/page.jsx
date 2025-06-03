"use client";

import { useEffect, useState } from "react";
import { db, auth } from "@/lib/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  Timestamp,
  getDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import StaffManagement from "@/components/StaffManagement";
import StudentList from "@/components/StudentList";
import Announcements from "@/components/Announcements";
import SchoolEvents from "@/components/SchoolEvents";
import GalleryPage from "@/app/dashboard/principal/GalleryPage/page";
import ProfileSettings from "@/app/dashboard/principal/profile-settings/page";
import ContactRequestsPage from "./contact-requests/page";

import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUserTie,
  FaBuilding,
  FaCalendarAlt,
  FaEnvelope,
} from "react-icons/fa";

// Reusable card component
function StatsCard({ title, value, icon }) {
  return (
    <div className="bg-white border border-blue-200 shadow-md rounded-lg p-6 text-center transition transform hover:scale-105 duration-300">
      <div className="text-4xl mb-3 text-blue-600">{icon}</div>
      <h3 className="text-xl font-semibold text-blue-700">{title}</h3>
      <p className="text-2xl font-bold text-blue-900 mt-2">{value}</p>
    </div>
  );
}

export default function PrincipalDashboard() {
  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    clerks: 0,
    classes: 0,
    events: 0,
    contacts: 0,
  });

  const [principalName, setPrincipalName] = useState("Principal");

  // Fetch logged-in user's display name
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setPrincipalName(user.displayName || user.email || "Principal");
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // async function fetchStats() {
    //   try {
    //     const now = Timestamp.now();

    //     const [
    //       studentsSnap,
    //       teachersSnap,
    //       clerksSnap,
    //       classesSnap,
    //       eventsSnap,
    //       contactsSnap,
    //     ] = await Promise.all([
    //       getDocs(query(collection(db, "users"), where("role", "==", "student"))),
    //       getDocs(query(collection(db, "users"), where("role", "==", "teacher"))),
    //       getDocs(query(collection(db, "users"), where("role", "==", "clerk"))),
    //       getDocs(collection(db, "classes")),
    //       getDocs(query(collection(db, "events"), where("date", ">=", now))),
    //       getDocs(query(collection(db, "contacts"), where("status", "==", "pending"))),
    //     ]);

    //     setStats({
    //       students: studentsSnap.size,
    //       teachers: teachersSnap.size,
    //       clerks: clerksSnap.size,
    //       classes: classesSnap.size,
    //       events: eventsSnap.size,
    //       contacts: contactsSnap.size,
    //     });
    //   } catch (error) {
    //     console.error("Failed to fetch stats:", error);
    //   }
    // }
    const fetchStats = async () => {
      try {
        const [
          studentsSnap,
          eventsSnap,
          teachersSnap,
          clerksSnap,
          classesSnap,
          contactsSnap,
        ] = await Promise.all([
          getDocs(collection(db, "students")),
          getDocs(collection(db, "events")),
          getDocs(
            query(collection(db, "users"), where("role", "==", "teacher"))
          ),
          getDocs(query(collection(db, "users"), where("role", "==", "clerk"))),
          getDocs(collection(db, "classes")),
          getDocs(collection(db, "contactRequests")),
        ]);

        setStats({
          students: studentsSnap.size,
          events: eventsSnap.size,
          teachers: teachersSnap.size,
          clerks: clerksSnap.size,
          classes: classesSnap.size,
          contacts: contactsSnap.size,
        });

        // console.log("✅ Stats fetched:", {
        //   students: studentsSnap.size,
        //   events: eventsSnap.size,
        // });
      } catch (error) {
        console.error("❌ Failed to fetch stats:", error);
      }
    };
    fetchStats();
  }, []);

  const statsData = [
    {
      title: "Total Students",
      value: stats.students,
      icon: <FaUserGraduate />,
    },
    {
      title: "Total Teachers",
      value: stats.teachers,
      icon: <FaChalkboardTeacher />,
    },
    { title: "Total Clerks", value: stats.clerks, icon: <FaUserTie /> },
    { title: "Total Classes", value: stats.classes, icon: <FaBuilding /> },
    { title: "Upcoming Events", value: stats.events, icon: <FaCalendarAlt /> },
    {
      title: "Pending Contact Requests",
      value: stats.contacts,
      icon: <FaEnvelope />,
    },
  ];

  const currentDate = new Date().toLocaleString();

  return (
    <main className="p-20 max-w-7xl mx-auto bg-sky-50 rounded-lg shadow-md min-h-screen">
      {/* Welcome Section */}
      <section className="mb-8 flex flex-col md:flex-row items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blue-900 mb-1">
            Welcome, {principalName}!
          </h1>
          <p className="text-blue-700">Roshan Tara School</p>
          <p className="text-gray-600 mt-2">{currentDate}</p>
        </div>
        <div>
          <img
            src="/logo.png"
            alt="School Logo"
            className="w-24 h-24 object-contain"
          />
        </div>
      </section>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statsData.map(({ title, value, icon }) => (
          <StatsCard key={title} title={title} value={value} icon={icon} />
        ))}
      </section>

      {/* Dashboard Sections */}
      <section className="mt-12 space-y-10">
        <h2 className="text-2xl font-semibold text-blue-800">
          Staff Management
        </h2>
        <StaffManagement />

        <h2 className="text-2xl font-semibold text-blue-800">
          Student Management
        </h2>
        <StudentList />

        <h2 className="text-2xl font-semibold text-blue-800">School Events</h2>
        <SchoolEvents />

        <h2 className="text-2xl font-semibold text-blue-800">
          Announcements / Notices
        </h2>
        <Announcements />

        <h2 className="text-2xl font-semibold text-blue-800">
          Gallery Management
        </h2>
        <GalleryPage />

        <h2 className="text-2xl font-semibold text-blue-800">
          Contact Requests
        </h2>
        <ContactRequestsPage />

        <h2 className="text-2xl font-semibold text-blue-800">Video Section</h2>
        <p className="text-gray-600">[School videos and tours here]</p>

        <h2 className="text-2xl font-semibold text-blue-800">
          Profile Settings
        </h2>
        <ProfileSettings />
      </section>
    </main>
  );
}

// =======================================================================
// "use client";

// import { useEffect, useState } from "react";
// import { db } from "@/lib/firebase";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { doc, getDoc, collection, getDocs, query, where, Timestamp } from "firebase/firestore";

// import StaffManagement from "@/components/StaffManagement";
// import StudentList from "@/components/StudentList";
// import Announcements from "@/components/Announcements";
// import SchoolEvents from "@/components/SchoolEvents";
// import GalleryPage from "@/app/dashboard/principal/GalleryPage/page";
// import ProfileSettings from "../principal/profile-settings/page";
// import ContactRequestsPage from "./contact-requests/page";

// import {
//   FaUserGraduate,
//   FaChalkboardTeacher,
//   FaUserTie,
//   FaBuilding,
//   FaCalendarAlt,
//   FaEnvelope,
// } from "react-icons/fa";

// function StatsCard({ title, value, icon }) {
//   return (
//     <div className="bg-white border border-blue-200 shadow-md rounded-lg p-6 text-center transition transform hover:scale-105 duration-300">
//       <div className="text-4xl mb-3 text-blue-600">{icon}</div>
//       <h3 className="text-xl font-semibold text-blue-700">{title}</h3>
//       <p className="text-2xl font-bold text-blue-900 mt-2">{value}</p>
//     </div>
//   );
// }

// export default function PrincipalDashboard() {
//   const [stats, setStats] = useState({
//     students: 0,
//     teachers: 0,
//     clerks: 0,
//     classes: 0,
//     events: 0,
//     contacts: 0,
//   });

//   const [principalName, setPrincipalName] = useState("");

//   // ✅ Fetch logged-in principal's name from Firestore
//   useEffect(() => {
//     const auth = getAuth();
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         try {
//           const userRef = doc(db, "users", user.uid);
//           const userSnap = await getDoc(userRef);

//           if (userSnap.exists()) {
//             const data = userSnap.data();
//             setPrincipalName(data.name || "Principal");
//           } else {
//             console.warn("User document not found in Firestore.");
//           }
//         } catch (err) {
//           console.error("Failed to fetch principal name:", err);
//         }
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   useEffect(() => {
//     async function fetchStats() {
//       try {
//         const now = Timestamp.now();

//         const [
//           studentsSnap,
//           teachersSnap,
//           clerksSnap,
//           classesSnap,
//           eventsSnap,
//           contactsSnap,
//         ] = await Promise.all([
//           getDocs(query(collection(db, "users"), where("role", "==", "student"))),
//           getDocs(query(collection(db, "users"), where("role", "==", "teacher"))),
//           getDocs(query(collection(db, "users"), where("role", "==", "clerk"))),
//           getDocs(collection(db, "classes")),
//           getDocs(query(collection(db, "events"), where("date", ">=", now))),
//           getDocs(query(collection(db, "contacts"), where("status", "==", "pending"))),
//         ]);

//         setStats({
//           students: studentsSnap.size,
//           teachers: teachersSnap.size,
//           clerks: clerksSnap.size,
//           classes: classesSnap.size,
//           events: eventsSnap.size,
//           contacts: contactsSnap.size,
//         });
//       } catch (error) {
//         console.error("Failed to fetch stats:", error);
//       }
//     }

//     fetchStats();
//   }, []);

//   const statsData = [
//     { title: "Total Students", value: stats.students, icon: <FaUserGraduate /> },
//     { title: "Total Teachers", value: stats.teachers, icon: <FaChalkboardTeacher /> },
//     { title: "Total Clerks", value: stats.clerks, icon: <FaUserTie /> },
//     { title: "Total Classes", value: stats.classes, icon: <FaBuilding /> },
//     { title: "Upcoming Events", value: stats.events, icon: <FaCalendarAlt /> },
//     { title: "Pending Contacts", value: stats.contacts, icon: <FaEnvelope /> },
//   ];

//   const currentDate = new Date().toLocaleString();

//   return (
//     <main className="p-20 max-w-7xl mx-auto bg-sky-50 rounded-lg shadow-md min-h-screen">
//       {/* Header / Welcome Section */}
//       <section className="mb-8 flex flex-col md:flex-row items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-blue-900 mb-1">
//             Welcome, {principalName ? principalName : "Loading..."}!
//           </h1>
//           {/* <p className="text-blue-700">Roshan Tara School</p> */}
//           <p className=" text-blue-900 mt-2">{currentDate}</p>
//         </div>
//         <div>
//           <img src="/logo.png" alt="School Logo" className="w-24 h-24 object-contain" />
//         </div>
//       </section>

//       {/* Stats Summary Cards */}
//       <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {statsData.map(({ title, value, icon }) => (
//           <StatsCard key={title} title={title} value={value} icon={icon} />
//         ))}
//       </section>

//       {/* Feature Sections */}
//       <section className="mt-12 space-y-10">
//         <h2 className="text-2xl font-semibold text-blue-800">Staff Management</h2>
//         <StaffManagement />

//         <h2 className="text-2xl font-semibold text-blue-800">Student Management</h2>
//         <StudentList />

//         <h2 className="text-2xl font-semibold text-blue-800">School Events</h2>
//         <SchoolEvents />

//         <h2 className="text-2xl font-semibold text-blue-800">Announcements / Notices</h2>
//         <Announcements />

//         <h2 className="text-2xl font-semibold text-blue-800">Gallery Management</h2>
//         <GalleryPage />

//         <h2 className="text-2xl font-semibold text-blue-800">Contact Requests</h2>
//         <ContactRequestsPage />

//         <h2 className="text-2xl font-semibold text-blue-800">Video Section</h2>
//         <p className="text-gray-600">[School videos and tours here]</p>

//         <h2 className="text-2xl font-semibold text-blue-800">Profile Settings</h2>
//         <ProfileSettings />
//       </section>
//     </main>
//   );
// }
