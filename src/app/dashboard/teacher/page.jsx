'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase'; // adjust path if needed
import { motion } from 'framer-motion';

export default function TeacherStats() {
  const [stats, setStats] = useState({
    students: 0,
    events: 0,
    announcements: 0,
    assignments: 0,
  });

  const fetchStats = async () => {
    const [studentsSnap, eventsSnap, announcementsSnap, assignmentsSnap] = await Promise.all([
      getDocs(collection(db, 'students')),
      getDocs(collection(db, 'events')),
      getDocs(collection(db, 'announcements')),
      getDocs(collection(db, 'assignments')),
    ]);

    setStats({
      students: studentsSnap.size,
      events: eventsSnap.size,
      announcements: announcementsSnap.size,
      assignments: assignmentsSnap.size,
    });
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const cardData = [
    { label: 'Total Students', value: stats.students, gradient: 'from-blue-400 to-blue-600' },
    { label: 'Total Events', value: stats.events, gradient: 'from-green-400 to-green-600' },
    { label: 'Total Announcements', value: stats.announcements, gradient: 'from-yellow-400 to-yellow-600' },
    { label: 'Total Assignments', value: stats.assignments, gradient: 'from-purple-400 to-purple-600' },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800 tracking-wide">
        Dashboard Stats
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {cardData.map(({ label, value, gradient }, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.6, ease: 'easeOut' }}
            whileHover={{ scale: 1.05, boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)' }}
            className="bg-white rounded-xl border border-gray-200 shadow-md cursor-pointer p-8 flex flex-col items-center justify-center"
          >
            <p
              className={`text-6xl font-extrabold bg-gradient-to-r ${gradient} text-transparent bg-clip-text`}
              style={{ fontFeatureSettings: '"tnum"' }}
            >
              {value}
            </p>
            <p className="mt-4 text-xl font-semibold text-gray-700 tracking-wide">{label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
