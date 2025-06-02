"use client";

import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Mrs. Sobia Ahmed",
    relation: "Parent",
    feedback:
      "This school has transformed my child's learning. Excellent staff and environment!",
  },
  {
    name: "Ali Raza",
    relation: "Student",
    feedback:
      "Great teachers and fun activities. I enjoy learning every day!",
  },
  {
    name: "Mr. Farooq Khan",
    relation: "Parent",
    feedback:
      "The staff is supportive and the school focuses on both academics and personality building.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-sky-50 py-12 px-6">
      <h2 className="text-3xl font-bold text-center text-blue-900 mb-10">
        What People Say
      </h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {testimonials.map((item, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-lg p-6 shadow-md border border-sky-300 hover:shadow-xl transition duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-yellow-400 mr-1" />
              ))}
            </div>
            <p className="text-gray-700 mb-4 italic">"{item.feedback}"</p>
            <h4 className="text-blue-800 font-semibold">{item.name}</h4>
            <p className="text-blue-500 text-sm">{item.relation}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
