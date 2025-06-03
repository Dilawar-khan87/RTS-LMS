import React from 'react'

function page() {
  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Principal Dashboard</h2>
      <p className="text-gray-700">Welcome to your dashboard. Here you can manage school operations, view reports, and oversee staff and students.</p>
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Key Features</h3>
        <ul className="list-disc pl-5">
          <li>View School Reports</li>
          <li>Manage Staff and Students</li>
          <li>Access Administrative Tools</li>
        </ul>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Recent Activities</h3>
        <ul className="list-disc pl-5">
          <li>Reviewed new student applications</li>
          <li>Approved staff leave requests</li>
          <li>Scheduled upcoming school events</li>
        </ul>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Announcements</h3>
        <p className="text-gray-600">Please check the announcements section regularly for updates on school policies and events.</p>
      </div>
    </div>
  )
}

export default page