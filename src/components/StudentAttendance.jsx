// "use client";

// import { useState, useEffect } from "react";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import {
//   getFirestore,
//   doc,
//   getDoc,
//   setDoc,
//   collection,
//   getDocs,
// } from "firebase/firestore";
// import { app } from "@/lib/firebase";
// import dayjs from "dayjs";

// const StudentAttendance = () => {
//   const [user, setUser] = useState(null);
//   const [attendance, setAttendance] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [todayStatus, setTodayStatus] = useState(null);
//   const [marking, setMarking] = useState(false);

//   const db = getFirestore(app);
//   const auth = getAuth(app);
//   const today = dayjs().format("YYYY-MM-DD");

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//       if (currentUser) {
//         setUser(currentUser);
//         await fetchAttendance(currentUser.uid);
//       }
//     });
//     return () => unsubscribe();
//   }, []);

//   const fetchAttendance = async (uid) => {
//     setLoading(true);
//     try {
//       const studentDocRef = doc(db, "attendance", uid);
//       const studentSnap = await getDoc(studentDocRef);

//       if (studentSnap.exists()) {
//         const data = studentSnap.data();
//         setAttendance(data);
//         setTodayStatus(data[today]?.status || null);
//       } else {
//         setAttendance({});
//       }
//     } catch (error) {
//       console.error("Error fetching attendance:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleMarkPresent = async () => {
//     if (!user) return;
//     setMarking(true);

//     try {
//       const studentDocRef = doc(db, "attendance", user.uid);
//       const updatedData = {
//         ...attendance,
//         [today]: { status: "present" },
//       };
//       await setDoc(studentDocRef, updatedData, { merge: true });
//       setAttendance(updatedData);
//       setTodayStatus("present");
//     } catch (error) {
//       console.error("Error marking attendance:", error);
//       alert("Failed to mark attendance.");
//     } finally {
//       setMarking(false);
//     }
//   };

//   const getSummary = () => {
//     const dates = Object.keys(attendance);
//     const present = dates.filter((d) => attendance[d].status === "present")
//       .length;
//     const absent = dates.filter((d) => attendance[d].status === "absent")
//       .length;
//     const total = present + absent;
//     const percentage = total === 0 ? 0 : Math.round((present / total) * 100);
//     return { present, absent, total, percentage };
//   };

//   const { present, absent, total, percentage } = getSummary();

//   return (
//     <div className="max-w-2xl mx-auto mt-8 p-6">
//       <h1 className="text-2xl font-bold mb-4 text-center">Attendance</h1>

//       {/* Summary Card */}
//       <div className="bg-blue-100 p-4 rounded-lg shadow mb-6">
//         <h2 className="text-lg font-semibold mb-2">Summary</h2>
//         <p>Total Days: {total}</p>
//         <p>Present: {present}</p>
//         <p>Absent: {absent}</p>
//         <p>Attendance: {percentage}%</p>
//       </div>

//       {/* Mark Present Button */}
//       {todayStatus === "present" ? (
//         <p className="text-green-600 font-medium mb-4">You have already marked attendance for today ✅</p>
//       ) : (
//         <button
//           onClick={handleMarkPresent}
//           disabled={marking}
//           className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-4"
//         >
//           {marking ? "Marking..." : "Mark Present for Today"}
//         </button>
//       )}

//       {/* Daily Attendance Table */}
//       <div className="bg-white p-4 shadow rounded-lg">
//         <h2 className="text-lg font-semibold mb-3">Daily Attendance</h2>
//         {loading ? (
//           <p>Loading attendance...</p>
//         ) : (
//           <table className="w-full text-left border">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="px-3 py-2 border">Date</th>
//                 <th className="px-3 py-2 border">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {Object.keys(attendance)
//                 .sort((a, b) => (a < b ? 1 : -1))
//                 .map((date) => (
//                   <tr key={date}>
//                     <td className="px-3 py-2 border">{date}</td>
//                     <td className="px-3 py-2 border">
//                       {attendance[date].status === "present" ? (
//                         <span className="text-green-600 font-medium">Present</span>
//                       ) : (
//                         <span className="text-red-600 font-medium">Absent</span>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StudentAttendance;

"use client";

import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { app } from "@/lib/firebase";
import dayjs from "dayjs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StudentAttendance = () => {
  const auth = getAuth(app);
  const db = getFirestore(app);

  const [user, setUser] = useState(null);
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(true);
  const [marking, setMarking] = useState(false);

  // For filters
  const [filterType, setFilterType] = useState("month"); // "month" or "week"
  const [filterDate, setFilterDate] = useState(new Date());

  const today = dayjs().format("YYYY-MM-DD");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await fetchAttendance(currentUser.uid);
      } else {
        setUser(null);
        setAttendance({});
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchAttendance = async (uid) => {
    setLoading(true);
    try {
      const docRef = doc(db, "attendance", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setAttendance(docSnap.data());
      } else {
        setAttendance({});
      }
    } catch (err) {
      console.error("Error fetching attendance:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkPresent = async () => {
    if (!user) return;

    setMarking(true);
    try {
      const studentRef = doc(db, "attendance", user.uid);
      const newData = {
        ...attendance,
        [today]: { status: "present" },
      };
      await setDoc(studentRef, newData, { merge: true });
      setAttendance(newData);
    } catch (error) {
      console.error("Error marking attendance:", error);
    } finally {
      setMarking(false);
    }
  };

  // Helper to get filtered dates (based on filterType and filterDate)
  const getFilteredDates = () => {
    const allDates = Object.keys(attendance);

    if (filterType === "month") {
      // Filter dates within selected month/year
      const selectedMonth = dayjs(filterDate).month();
      const selectedYear = dayjs(filterDate).year();

      return allDates.filter((date) => {
        const d = dayjs(date);
        return d.month() === selectedMonth && d.year() === selectedYear;
      });
    } else if (filterType === "week") {
      // Filter dates within the selected week (Monday to Sunday)
      const startOfWeek = dayjs(filterDate).startOf("week"); // Sunday start
      const endOfWeek = dayjs(filterDate).endOf("week");

      return allDates.filter((date) => {
        const d = dayjs(date);
        return d.isAfter(startOfWeek.subtract(1, "day")) && d.isBefore(endOfWeek.add(1, "day"));
      });
    }
    return allDates;
  };

  const filteredDates = getFilteredDates();

  // Attendance summary for filtered period
  const getFilteredSummary = () => {
    const present = filteredDates.filter(
      (date) => attendance[date].status === "present"
    ).length;
    const absent = filteredDates.filter(
      (date) => attendance[date].status === "absent"
    ).length;
    const total = present + absent;
    const percentage = total > 0 ? Math.round((present / total) * 100) : 0;

    return { present, absent, total, percentage };
  };

  const { present, absent, total, percentage } = getFilteredSummary();
  const todayStatus = attendance[today]?.status || null;

  // Prepare data for Bar chart (days in filter range)
  const prepareChartData = () => {
    const labels = filteredDates.sort((a, b) => (a < b ? -1 : 1));
    const presentData = labels.map((date) =>
      attendance[date].status === "present" ? 1 : 0
    );
    const absentData = labels.map((date) =>
      attendance[date].status === "absent" ? 1 : 0
    );

    return {
      labels,
      datasets: [
        {
          label: "Present",
          data: presentData,
          backgroundColor: "rgba(34,197,94, 0.7)", // green
        },
        {
          label: "Absent",
          data: absentData,
          backgroundColor: "rgba(239,68,68, 0.7)", // red
        },
      ],
    };
  };

  const chartData = prepareChartData();

  // Calendar style view (simple)
  // For simplicity, we'll show the current month calendar with attendance status on dates
  const renderCalendar = () => {
    const startOfMonth = dayjs(filterDate).startOf("month");
    const endOfMonth = dayjs(filterDate).endOf("month");
    const daysInMonth = endOfMonth.date();

    // Get first day of week for the month (0=Sunday)
    const startDay = startOfMonth.day();

    const calendarCells = [];

    // Empty cells before first day of month
    for (let i = 0; i < startDay; i++) {
      calendarCells.push(<div key={"empty-" + i} className="p-4"></div>);
    }

    // Date cells with attendance status
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = startOfMonth.date(day).format("YYYY-MM-DD");
      const status = attendance[dateStr]?.status || "none";

      let bgColor = "bg-gray-100";
      let textColor = "text-gray-600";
      if (status === "present") {
        bgColor = "bg-green-200";
        textColor = "text-green-800";
      } else if (status === "absent") {
        bgColor = "bg-red-200";
        textColor = "text-red-800";
      }

      calendarCells.push(
        <div
          key={dateStr}
          className={`border rounded p-2 flex flex-col items-center justify-center cursor-default ${bgColor}`}
        >
          <span className={`font-semibold ${textColor}`}>{day}</span>
          {status !== "none" && (
            <span
              className={`mt-1 text-xs font-bold ${
                status === "present" ? "text-green-700" : "text-red-700"
              }`}
            >
              {status}
            </span>
          )}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-7 gap-1 mt-4 select-none">
        {/* Weekday headers */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div
            key={d}
            className="font-bold text-center text-gray-700 border-b pb-1"
          >
            {d}
          </div>
        ))}
        {calendarCells}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-8 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">📋 Attendance</h1>

      {/* Filter controls */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4 justify-center">
        <select
          className="border rounded px-3 py-2"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="month">Monthly View</option>
          <option value="week">Weekly View</option>
        </select>

        <DatePicker
          selected={filterDate}
          onChange={(date) => setFilterDate(date)}
          dateFormat={filterType === "month" ? "MMMM yyyy" : "MMM d, yyyy"}
          showMonthYearPicker={filterType === "month"}
          showWeekNumbers={filterType === "week"}
          className="border rounded px-3 py-2 w-full sm:w-auto"
        />
      </div>

      {/* Summary */}
      <div className="bg-blue-50 p-4 rounded-md mb-6 border border-blue-200 text-center">
        <h2 className="text-lg font-semibold mb-2">Summary ({filterType})</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm max-w-md mx-auto">
          <p>Total Days: <strong>{total}</strong></p>
          <p>Present: <strong className="text-green-600">{present}</strong></p>
          <p>Absent: <strong className="text-red-500">{absent}</strong></p>
          <p>Percentage: <strong>{percentage}%</strong></p>
        </div>
      </div>

      {/* Mark Attendance Button */}
      {todayStatus === "present" ? (
        <p className="text-green-600 mb-4 font-medium text-center">
          ✅ You've already marked present today.
        </p>
      ) : (
        <div className="text-center mb-6">
          <button
            onClick={handleMarkPresent}
            disabled={marking}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded"
          >
            {marking ? "Marking..." : "Mark Present for Today"}
          </button>
        </div>
      )}

      {/* Attendance Bar Chart */}
      <div className="max-w-3xl mx-auto mb-8">
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: { position: "top" },
              title: {
                display: true,
                text: `Attendance Chart (${filterType})`,
                font: { size: 18 },
              },
            },
            scales: {
              y: { beginAtZero: true, ticks: { stepSize: 1, max: 1 } },
            },
          }}
        />
      </div>

      {/* Calendar View */}
      <div className="max-w-4xl mx-auto">
        <h3 className="text-lg font-semibold mb-2 text-center">
          Calendar View ({dayjs(filterDate).format("MMMM YYYY")})
        </h3>
        {renderCalendar()}
      </div>
    </div>
  );
};

export default StudentAttendance;
