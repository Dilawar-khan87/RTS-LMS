"use client";

import { motion } from "framer-motion";
import { FaTrophy } from "react-icons/fa";

const achievements = [
  {
    name: "Ayesha Khan",
    title: "Topper – Class 10",
    detail: "Scored 98% in final board exams.",
    image: "/images/achievers/ayesha.jpg", // Add your own image later
  },
  {
    name: "Ali Raza",
    title: "Best Athlete",
    detail: "Won 3 gold medals in Sports Day 2025.",
    image: "/images/achievers/ali.jpg",
  },
  {
    name: "Zara Sheikh",
    title: "Debate Champion",
    detail: "1st Position in Inter-School Debate 2025.",
    image: "/images/achievers/zara.jpg",
  },
  {
    name: "Ahmed Noor",
    title: "Science Fair Winner",
    detail: "Built an automated irrigation model.",
    image: "/images/achievers/ahmed.jpg",
  },
];

export default function Achievements() {
  return (
    <section className="bg-sky-50 py-14 px-6">
      <h2 className="text-3xl font-bold text-center text-blue-900 mb-10">
        Student Achievements
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {achievements.map((achiever, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-lg overflow-hidden shadow-md border border-blue-200 hover:shadow-xl transition"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <img
              src={achiever.image}
              alt={achiever.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-semibold text-blue-800 flex items-center gap-2">
                <FaTrophy className="text-yellow-400" /> {achiever.title}
              </h3>
              <p className="text-blue-700 mt-1">{achiever.name}</p>
              <p className="text-gray-600 text-sm mt-2">{achiever.detail}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
