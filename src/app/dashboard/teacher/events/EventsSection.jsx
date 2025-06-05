'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

export default function EventsSection() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const q = query(collection(db, 'events'), orderBy('date', 'desc'));
        const querySnapshot = await getDocs(q);

        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-blue-500 h-16 w-16 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-800 tracking-wide">
        Upcoming Events
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {events.map(({ id, title, description, date }, index) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.6, ease: 'easeOut' }}
            whileHover={{ scale: 1.05, boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)' }}
            className="bg-white rounded-xl border border-gray-200 shadow-md cursor-pointer p-8 flex flex-col justify-between"
          >
            <h3 className="text-2xl font-extrabold text-blue-700 mb-4">{title}</h3>
            <p className="text-gray-700 flex-grow">{description}</p>
            <p
              className="mt-6 text-xl font-extrabold bg-gradient-to-r from-green-400 to-green-600 text-transparent bg-clip-text tracking-wide"
              style={{ fontFeatureSettings: '"tnum"' }}
            >
              {date?.toDate
                ? format(date.toDate(), 'MMMM d, yyyy')
                : 'Unknown date'}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
