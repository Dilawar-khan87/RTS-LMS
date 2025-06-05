import React from "react";
import TeacherProfileSettings from "@/app/dashboard/teacher/ProfileSettings/TeacherProfileSettings"

function page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Profile settings</h1>
      <TeacherProfileSettings />
    </div>
  );
}

export default page;
