"use client";

import { motion } from "framer-motion";

export default function VideoTour() {
  return (
    <section className="bg-sky-50 py-14 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl font-bold text-blue-900 mb-2">
          🎥 School Video Tour
        </h2>
        <p className="text-blue-500 text-sm max-w-2xl mx-auto">
          Explore our campus, classrooms, labs, and playground through this short video tour. A quick peek into the amazing learning environment!
        </p>
      </motion.div>

      <motion.div
        className="max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg border-4 border-blue-200"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            src="https://www.youtube.com/embed/your_video_id_here"
            title="School Video Tour"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      </motion.div>
    </section>
  );
}
