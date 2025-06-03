import React from "react";

export default function StatsCard({ title, value, icon }) {
  return (
    <div className="bg-white border border-blue-200 shadow-md rounded-lg p-6 text-center transition transform hover:scale-105 duration-300">
      <div className="text-4xl mb-3 text-blue-600">{icon}</div>
      <h3 className="text-xl font-semibold text-blue-700">{title}</h3>
      <p className="text-2xl font-bold text-blue-900 mt-2">{value}</p>
    </div>
  );
}
