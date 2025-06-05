import React from "react";
import TeacherHomeworkForm from "./TeacherHomeworkForm";

function page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 mt-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Homework</h1>
      <TeacherHomeworkForm />
    </div>
  );
}

export default page;
