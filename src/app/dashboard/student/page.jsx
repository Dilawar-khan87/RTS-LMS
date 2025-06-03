import React from 'react'

function page() {
  return (
<div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Student Dashboard</h2>
      <p className="text-gray-700">Welcome to your dashboard. Here you can view your grades, assignments, and more.</p>
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Your Grades</h3>
        <ul className="list-disc pl-5">
          <li>Math: A</li>
          <li>Science: B+</li>
          <li>History: A-</li>
        </ul>
      </div>
    </div>
    
  )
}

export default page