// /app/dashboard/teacher/layout.jsx
'use client';
import Sidebar from './sidebar';

export default function TeacherLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar will always be shown */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 ml-64 p-6 bg-gray-100">{children}</main>
    </div>
  );
}
