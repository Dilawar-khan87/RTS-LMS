import React from "react";
import TeacherMarksEntry from "./TeacherMarksEntry";

function page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">All Results</h1>
      <TeacherMarksEntry />
    </div>
  );
}

export default page;
