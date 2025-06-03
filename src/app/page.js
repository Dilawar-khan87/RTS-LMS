"use client";
import Image from "next/image";
import Link from "next/link";
import Testimonials from "@/components/Testimonials";
import Events from "@/components/Events";
import Achievements from "@/components/Achievements";
import StatsAdmission from "@/components/StatsAdmission";
import VideoTour from "@/components/VideoTour";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaTrophy,
  FaSchool,
} from "react-icons/fa";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import SignUpTest from "./SignUp/page";

export default function HomePage() {
  return (
    <>
      {/* <SignUpTest /> */}
      <StatsAdmission />
      <VideoTour />
      <Testimonials />
      <Events />
      <Achievements />
      <WhatsAppFloat />
    </>

    // <div className="text-blue-900 bg-gradient-to-br from-sky-100 via-sky-200 to-white">

    //   {/* Hero Section */}
    //   <section className="text-center py-20 px-6">
    //     <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Roshan Tara School</h1>
    //     <p className="text-lg md:text-2xl mb-6 font-light">
    //       Inspiring Minds, Building Futures
    //     </p>
    //     <Link href="/Gallery" className="bg-blue-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-600 transition">
    //       Visit Gallery
    //     </Link>
    //   </section>

    //   {/* About Short Section */}
    //   <section className="text-center py-16 px-6 bg-sky-100">
    //     <h2 className="text-3xl font-semibold mb-4">About Our School</h2>
    //     <p className="max-w-3xl mx-auto text-lg">
    //       Our school is dedicated to excellence in education, discipline, and personality development.
    //       We provide students with opportunities to explore academics, sports, technology and the arts.
    //     </p>
    //     <Link href="/About" className="inline-block mt-6 text-blue-600 underline hover:text-blue-800 transition">
    //       Learn More →
    //     </Link>
    //   </section>

    //   {/* Quick Stats Section */}
    //   <section className="grid grid-cols-2 md:grid-cols-4 gap-6 py-16 px-6 bg-sky-200 text-center">
    //     {[
    //       { icon: <FaUserGraduate size={30} />, label: "Students", value: 1200 },
    //       { icon: <FaChalkboardTeacher size={30} />, label: "Staff", value: 50 },
    //       { icon: <FaTrophy size={30} />, label: "Awards", value: 30 },
    //       { icon: <FaSchool size={30} />, label: "Years", value: 25 },
    //     ].map((item, index) => (
    //       <motion.div
    //         key={index}
    //         initial={{ opacity: 0, y: 20 }}
    //         whileInView={{ opacity: 1, y: 0 }}
    //         transition={{ delay: index * 0.2 }}
    //         className="bg-white p-6 rounded-xl shadow-md border border-blue-200"
    //       >
    //         <div className="mb-2 text-blue-500">{item.icon}</div>
    //         {(() => {
    //           const [ref, inView] = useInView({ triggerOnce: true });
    //           const [start, setStart] = useState(false);

    //           useEffect(() => {
    //             if (inView) setStart(true);
    //           }, [inView]);

    //           return (
    //             <h3 ref={ref} className="text-2xl font-bold">
    //               {start ? <CountUp end={item.value} duration={2} suffix="+" /> : "0+"}
    //             </h3>
    //           );
    //         })()}
    //         <p>{item.label}</p>
    //       </motion.div>
    //     ))}
    //   </section>

    //   {/* Highlights Section */}
    //   <section className="py-20 px-6 bg-sky-50">
    //     <h2 className="text-3xl font-semibold text-center mb-10">What We Offer</h2>
    //     <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
    //       {[
    //         "Teaching Excellence",
    //         "Co-Curricular Activities",
    //         "Modern Classrooms",
    //         "Sports & Games",
    //       ].map((item, index) => (
    //         <motion.div
    //           key={index}
    //           initial={{ opacity: 0, scale: 0.8 }}
    //           whileInView={{ opacity: 1, scale: 1 }}
    //           transition={{ delay: index * 0.2 }}
    //           className="bg-white p-6 rounded-lg shadow-md border border-blue-100 hover:shadow-lg transition hover:scale-105"
    //         >
    //           <h3 className="text-xl font-bold mb-2">{item}</h3>
    //           <p className="text-sm text-blue-700">
    //             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae justo.
    //           </p>
    //         </motion.div>
    //       ))}
    //     </div>
    //   </section>

    //   {/* Gallery Preview */}
    //   <section className="py-20 px-6 bg-sky-100">
    //     <h2 className="text-3xl font-semibold text-center mb-10">Gallery Highlights</h2>
    //     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    //       {[1, 2, 3, 4].map((num) => (
    //         <div key={num} className="overflow-hidden rounded-lg shadow-md hover:scale-105 transition border border-blue-200">
    //           <Image
    //             src={`/gallery/sample${num}.jpg`}
    //             alt={`Gallery ${num}`}
    //             width={400}
    //             height={300}
    //             className="w-full h-48 object-cover"
    //           />
    //         </div>
    //       ))}
    //     </div>
    //     <div className="text-center mt-8">
    //       <Link href="/gallery" className="text-blue-600 underline hover:text-blue-800">View Full Gallery</Link>
    //     </div>
    //   </section>

    //   {/* Contact CTA */}
    //   <section className="text-center py-16 px-6 bg-sky-200">
    //     <h2 className="text-2xl font-semibold mb-4">Get in Touch With Us</h2>
    //     <p className="mb-6">Have questions or want to visit the campus? Reach out now.</p>
    //     <Link href="/Contact" className="bg-blue-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-600 transition">
    //       Contact Us
    //     </Link>
    //   </section>
    // </div>
  );
}
