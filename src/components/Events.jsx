"use client";

import { motion } from "framer-motion";
import { FaCalendarAlt } from "react-icons/fa";

const events = [
  {
    date: "2025-06-10",
    title: "Annual Sports Day",
    description: "A fun-filled day with track and field events for all classes.",
  },
  {
    date: "2025-07-01",
    title: "Parent-Teacher Meeting",
    description: "Meet with your child’s teachers to discuss progress and feedback.",
  },
  {
    date: "2025-08-14",
    title: "Independence Day Celebration",
    description: "Flag hoisting, speeches, and cultural programs.",
  },
  {
    date: "2025-09-05",
    title: "Science Exhibition",
    description: "Students will display creative science projects and experiments.",
  },
];

export default function Events() {
  return (
    <section className="bg-white py-14 px-6">
      <h2 className="text-3xl font-bold text-center text-blue-900 mb-10">
        Upcoming Events
      </h2>

      <div className="max-w-4xl mx-auto space-y-6 relative before:absolute before:top-0 before:bottom-0 before:left-4 before:w-1 before:bg-gradient-to-b from-sky-400 via-blue-500 to-blue-800">
        {events.map((event, index) => (
          <motion.div
            key={index}
            className="relative pl-12"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <div className="absolute left-0 top-1.5 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-md">
              <FaCalendarAlt />
            </div>
            <div className="bg-sky-50 border border-sky-200 p-5 rounded-lg shadow-sm hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-blue-800">
                {event.title}
              </h3>
              <p className="text-sm text-blue-500 mb-2">{event.date}</p>
              <p className="text-gray-700">{event.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
