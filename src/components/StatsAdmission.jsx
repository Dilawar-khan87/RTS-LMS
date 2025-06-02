"use client";

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { FaUserGraduate, FaChalkboardTeacher, FaSchool } from "react-icons/fa";

export default function StatsAdmission() {
  const [ref, inView] = useInView({ triggerOnce: true });

  const stats = [
    { icon: <FaUserGraduate />, label: "Students", value: 1500 },
    { icon: <FaChalkboardTeacher />, label: "Teachers", value: 80 },
    { icon: <FaSchool />, label: "Years of Excellence", value: 25 },
  ];

  const steps = [
    "Fill the Admission Form",
    "Attach Required Documents",
    "Submit to School Office",
    "Wait for Confirmation Call",
  ];

  return (
    <section className="bg-white py-14 px-6">
      {/* Stats */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-blue-900 mb-6">Our Stats</h2>
        <div
          ref={ref}
          className="grid md:grid-cols-3 gap-6 items-center justify-center"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-sky-50 border border-blue-200 shadow-md p-6 rounded-lg"
            >
              <div className="text-blue-600 text-4xl mb-2 flex justify-center">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold text-blue-800">
                {inView ? (
                  <CountUp end={stat.value} duration={2} />
                ) : (
                  "0"
                )}
                +
              </h3>
              <p className="text-blue-500 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Admission Process */}
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">
          Admission Process
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-sky-50 border border-blue-200 rounded-xl p-6 shadow-md hover:shadow-lg transition"
            >
              <div className="text-white bg-blue-600 w-10 h-10 flex items-center justify-center rounded-full text-lg font-bold mb-4">
                {index + 1}
              </div>
              <p className="text-blue-700 font-medium">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
