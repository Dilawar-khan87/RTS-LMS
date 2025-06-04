import React from "react";
import StudentTable from "./StudentTable";

function page() {
  return (
    <StudentTable />
    // <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
    //   <h1 className="text-4xl font-bold text-gray-800 mb-4">
    //     👨‍🎓 Students Page
    //   </h1>
    //   <p className="text-lg text-gray-600">
    //     This is the students management page.
    //   </p>
    //   <p className="text-sm text-gray-500 mt-2">More features coming soon!</p>
    // </div>
  );
}

export default page;
