"use client";

import ProtectedRoute from "../../components/ProtectedRoute";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex items-center justify-center bg-sky-100 text-center">
        <div className="bg-white p-8 shadow-lg rounded-lg">
          <h1 className="text-3xl font-bold text-blue-600">Welcome to Dashboard</h1>
          <p className="mt-4 text-gray-600">Only visible if you're logged in</p>
        </div>
      </div>
    </ProtectedRoute>
  );
}
