'use client'
export default function AboutPage() {
  const staffData = {
    principal: {
      name: 'Mr. Ahmed Khan',
      designation: 'Principal',
      qualification: 'Ph.D. in Education',
      img: 'https://randomuser.me/api/portraits/men/45.jpg',
    },
    accountant: {
      name: 'Mrs. Saira Malik',
      designation: 'Accountant',
      qualification: 'MBA Finance',
      img: 'https://randomuser.me/api/portraits/women/65.jpg',
    },
    teachingStaff: [
      {
        name: 'Ms. Ayesha Siddiqui',
        designation: 'Mathematics Teacher',
        qualification: 'M.Sc. Mathematics',
        img: 'https://randomuser.me/api/portraits/women/12.jpg',
      },
      {
        name: 'Mr. Imran Ali',
        designation: 'Physics Teacher',
        qualification: 'M.Sc. Physics',
        img: 'https://randomuser.me/api/portraits/men/33.jpg',
      },
      {
        name: 'Mrs. Nadia Raza',
        designation: 'English Teacher',
        qualification: 'M.A. English Literature',
        img: 'https://randomuser.me/api/portraits/women/44.jpg',
      },
    ],
    nonTeachingStaff: [
      {
        name: 'Mr. Aslam Butt',
        designation: 'Lab Assistant',
        qualification: 'Diploma in Lab Technology',
        img: 'https://randomuser.me/api/portraits/men/50.jpg',
      },
      {
        name: 'Mrs. Farah Naz',
        designation: 'Clerk',
        qualification: 'Intermediate',
        img: 'https://randomuser.me/api/portraits/women/29.jpg',
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 bg-gradient-to-b from-sky-50 to-white min-h-screen">
      <h1 className="text-5xl font-extrabold text-navyblue mb-14 text-center drop-shadow-md">
        About Our School Staff
      </h1>

      {/* Principal & Accountant */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        {[staffData.principal, staffData.accountant].map((person) => (
          <GlassCard key={person.name} person={person} />
        ))}
      </div>

      {/* Teaching Staff */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-sky-700 mb-8 border-b-4 border-gradient-to-r from-sky-400 to-navyblue inline-block pb-1">
          Teaching Staff
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {staffData.teachingStaff.map((teacher) => (
            <GlassCard key={teacher.name} person={teacher} />
          ))}
        </div>
      </section>

      {/* Non-Teaching Staff */}
      <section>
        <h2 className="text-3xl font-bold text-sky-700 mb-8 border-b-4 border-gradient-to-r from-sky-400 to-navyblue inline-block pb-1">
          Non-Teaching Staff
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {staffData.nonTeachingStaff.map((staff) => (
            <GlassCard key={staff.name} person={staff} />
          ))}
        </div>
      </section>
    </div>
  );
}


function GlassCard({ person }) {
  return (
    <div className="relative rounded-xl p-6 bg-white bg-opacity-20 backdrop-blur-md border-4  border-sky-400 border-gradient-to-r from-sky-400 to-navyblue shadow-lg hover:shadow-2xl transform hover:scale-105 cursor-pointer transition-all duration-500">
      <div className="flex flex-col items-center text-center space-y-4">
        <img
          src={person.img}
          alt={person.name}
          className="w-28 h-28 rounded-full border-4 border-white shadow-md object-cover"
          loading="eager"
        />
        <h3 className="text-xl font-semibold text-navyblue drop-shadow-sm">{person.name}</h3>
        <p className="text-sky-600 font-semibold">{person.designation}</p>
        <p className="text-gray-700 italic">{person.qualification}</p>
      </div>
    </div>
  );
}

// ---------------
// // app/about/page.jsx
// "use client";

// // app/about/page.jsx
// "use client";

// import Image from "next/image";
// import { motion } from "framer-motion";

// const staffData = {
//   principal: {
//     name: "Mr. Ahmed Khan",
//     designation: "Principal",
//     qualification: "Ph.D. in Education",
//     img: "/staff/principal.jpg",
//   },
//   accountant: {
//     name: "Ms. Sara Malik",
//     designation: "Accountant",
//     qualification: "MBA Finance",
//     img: "/staff/accountant.jpg",
//   },
//   teachingStaff: [
//     {
//       name: "Mrs. Ayesha Tariq",
//       designation: "Math Teacher",
//       qualification: "M.Sc Mathematics",
//       img: "/staff/teacher1.jpg",
//     },
//     {
//       name: "Mr. Bilal Shah",
//       designation: "Science Teacher",
//       qualification: "M.Sc Physics",
//       img: "/staff/teacher2.jpg",
//     },
//   ],
//   nonTeachingStaff: [
//     {
//       name: "Mr. Rashid Ali",
//       designation: "Janitor",
//       qualification: "High School",
//       img: "/staff/nonteaching1.jpg",
//     },
//     {
//       name: "Ms. Nida Farooq",
//       designation: "Librarian",
//       qualification: "B.A. Literature",
//       img: "/staff/nonteaching2.jpg",
//     },
//   ],
// };

// const fadeUp = {
//   hidden: { opacity: 0, y: 20 },
//   visible: (i = 1) => ({
//     opacity: 1,
//     y: 0,
//     transition: { delay: i * 0.15 },
//   }),
// };

// export default function About() {
//   return (
//     <main className="max-w-7xl mx-auto px-6 py-12 bg-sky-50 min-h-screen">
//       <h1 className="text-4xl font-extrabold text-blue-900 mb-10 text-center">
//         Our Dedicated Team
//       </h1>

//       {/* Principal & Accountant */}
//       <section className="grid md:grid-cols-2 gap-8 mb-12">
//         {["principal", "accountant"].map((role, i) => {
//           const person = staffData[role];
//           return (
//             <motion.div
//               key={role}
//               className="bg-white rounded-xl shadow-lg border border-sky-300 p-6 flex items-center gap-6"
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true }}
//               custom={i}
//               variants={fadeUp}
//             >
//               <Image
//                 src={person.img}
//                 alt={person.name}
//                 width={120}
//                 height={120}
//                 className="rounded-full object-cover border-4 border-sky-400"
//                 priority
//               />
//               <div>
//                 <h2 className="text-2xl font-semibold text-blue-900">{person.name}</h2>
//                 <p className="text-blue-700 font-medium">{person.designation}</p>
//                 <p className="text-blue-500 italic">{person.qualification}</p>
//               </div>
//             </motion.div>
//           );
//         })}
//       </section>

//       {/* Teaching Staff */}
//       <section className="mb-12">
//         <h2 className="text-3xl font-bold text-blue-900 mb-6">Teaching Staff</h2>
//         <div className="grid md:grid-cols-3 gap-8">
//           {staffData.teachingStaff.map((person, i) => (
//             <motion.div
//               key={i}
//               className="bg-white rounded-xl shadow-md border border-sky-300 p-5 flex flex-col items-center"
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true }}
//               custom={i}
//               variants={fadeUp}
//             >
//               <Image
//                 src={person.img}
//                 alt={person.name}
//                 width={100}
//                 height={100}
//                 className="rounded-full object-cover border-4 border-sky-400"
//                 priority
//               />
//               <h3 className="text-xl font-semibold text-blue-900 mt-4">{person.name}</h3>
//               <p className="text-blue-700 font-medium">{person.designation}</p>
//               <p className="text-blue-500 italic">{person.qualification}</p>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* Non Teaching Staff */}
//       <section>
//         <h2 className="text-3xl font-bold text-blue-900 mb-6">Non-Teaching Staff</h2>
//         <div className="grid md:grid-cols-3 gap-8">
//           {staffData.nonTeachingStaff.map((person, i) => (
//             <motion.div
//               key={i}
//               className="bg-white rounded-xl shadow-md border border-sky-300 p-5 flex flex-col items-center"
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true }}
//               custom={i}
//               variants={fadeUp}
//             >
//               <Image
//                 src={person.img}
//                 alt={person.name}
//                 width={100}
//                 height={100}
//                 className="rounded-full object-cover border-4 border-sky-400"
//                 priority
//               />
//               <h3 className="text-xl font-semibold text-blue-900 mt-4">{person.name}</h3>
//               <p className="text-blue-700 font-medium">{person.designation}</p>
//               <p className="text-blue-500 italic">{person.qualification}</p>
//             </motion.div>
//           ))}
//         </div>
//       </section>
//     </main>
//   );
// }
