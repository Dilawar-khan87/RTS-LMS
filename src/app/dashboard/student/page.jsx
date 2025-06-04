import StudentOverviewCard from "@/components/StudentOverviewCard";
import StudentAttendance from "@/components/StudentAttendance";
import AnnouncementsForStudents from "@/components/AnnouncementsForStudents";
import EventsForStudents from "@/components/EventsForStudents";
import AssignmentsForStudents from "@/components/AssignmentsForStudents";
import ExamResultsForStudents from "@/components/ExamResultsForStudents";
import Testing from "@/components/Testing";

export default function page() {
  return (
    <div className="p-20">
      {/* <Testing /> */}

      {/* <ExamResultsForStudents /> */}
      <AssignmentsForStudents />
      <AnnouncementsForStudents />
      <EventsForStudents />
      <StudentOverviewCard />
      <StudentAttendance />
      {/* You can add more components here as needed */}
    </div>
  );
}
