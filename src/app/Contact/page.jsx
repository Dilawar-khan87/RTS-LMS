import ContactUsForm from "@/components/ContactUsForm";

export default function ContactPage() {
  return <ContactUsForm />;
}











// "use client";

// import { useState } from "react";
// import {
//   FaFacebookF,
//   FaLinkedinIn,
//   FaInstagram,
//   FaWhatsapp,
// } from "react-icons/fa";

// export default function ContactPage() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [successMsg, setSuccessMsg] = useState("");

//   // Simple validation function
//   const validate = () => {
//     let tempErrors = {};
//     if (!formData.name.trim()) tempErrors.name = "Name is required";
//     if (!formData.email.trim()) tempErrors.email = "Email is required";
//     else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email))
//       tempErrors.email = "Invalid email address";
//     if (!formData.subject.trim()) tempErrors.subject = "Subject is required";
//     if (!formData.message.trim()) tempErrors.message = "Message is required";

//     setErrors(tempErrors);

//     return Object.keys(tempErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (validate()) {
//       // Here you can handle sending form data to backend or email service

//       setSuccessMsg("Thank you! Your message has been sent.");
//       setFormData({ name: "", email: "", subject: "", message: "" });
//       setErrors({});
//       setTimeout(() => setSuccessMsg(""), 5000);
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto px-6 py-12 min-h-screen bg-gradient-to-b from-sky-50 to-white">
//       <h1 className="text-4xl md:text-5xl font-extrabold text-navyblue text-center mb-12 drop-shadow-md">
//         Contact Us
//       </h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
//         {/* Contact Info */}
//         <div className="space-y-10">
//           {/* <div
//             className="
//           p-6 
//           rounded-lg 
//           shadow-lg 
//           bg-gradient-to-r 
//           animate-gradient-x
//            from-sky-400
//             via-blue-500 to-navyblue 
//              text-white"
//           >
//             <h2 className="text-2xl font-bold mb-3 border-b-2 border-white inline-block pb-1">
//               School Information
//             </h2>
//             <p>
//               <strong>Address:</strong> 123 School Street, City, Country
//             </p>
//             <p>
//               <strong>Phone:</strong> +92 123 4567890
//             </p>
//             <p>
//               <strong>Email:</strong> info@yourschool.edu
//             </p>
//           </div> */}
//           <div
//             className="
//     p-6 
//     rounded-lg 
//     shadow-lg 
//     bg-gradient-to-br 
//     animate-gradient-x
//     from-sky-400
//     via-blue-500 
//     to-navyblue 
//     text-white
//   "
//           >
//             <h2 className="text-2xl font-bold mb-3 border-b-2 border-white inline-block pb-1">
//               School Information
//             </h2>
//             <p>
//               <strong>Address:</strong> Care Colony Opposite SASIMS , Sehwan Sharif District Jamshoro Sindh Pakistan
//             </p>
//             <p>
//               <strong>Phone:</strong> +92 300 0022440
//             </p>
//             <p>
//               <strong>Email:</strong> rts@gmail.com
//             </p>

//             {/* Right side white fade overlay */}
//             <div
//               className="pointer-events-none absolute top-0 right-0 h-full w-16
//       bg-gradient-to-br from-white/70 to-transparent rounded-r-lg"
//             />
//           </div>

//           <div className="p-6 rounded-lg shadow-lg bg-gradient-to-br from-sky-400 via-blue-500 to-navyblue animate-gradient-x text-white">
//             <h2 className="text-2xl font-bold mb-3 border-b-2 border-white inline-block pb-1">
//               Office Hours
//             </h2>
//             <p>Monday - Saturday: 8:00 AM - 4:00 PM</p>
//             <p>Sunday: Closed</p>
//           </div>

//           <div className="p-6 rounded-lg shadow-lg bg-gradient-to-br from-sky-400 via-blue-500 to-navyblue animate-gradient-x text-white">
//             <h2 className="text-2xl font-bold mb-3 border-b-2 border-white inline-block pb-1">
//               Follow Us
//             </h2>
//             {/* <div className="flex space-x-6 text-white text-3xl">
//               <a
//                 href="https://facebook.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label="Facebook"
//                 className="hover:text-sky-200 transition"
//               >
//                 <i className="fab fa-facebook-square"></i>
//               </a>
//               <a
//                 href="https://twitter.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label="Twitter"
//                 className="hover:text-sky-200 transition"
//               >
//                 <i className="fab fa-twitter-square"></i>
//               </a>
//               <a
//                 href="https://instagram.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label="Instagram"
//                 className="hover:text-sky-200 transition"
//               >
//                 <i className="fab fa-instagram-square"></i>
//               </a>
//               <a
//                 href="https://linkedin.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label="LinkedIn"
//                 className="hover:text-sky-200 transition"
//               >
//                 <i className="fab fa-linkedin"></i>
//               </a>
//             </div> */}
//             <div className="flex justify-center space-x-8 mt-6">
//               {/* Facebook */}
//               <a
//                 href="https://facebook.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label="Facebook"
//                 className="text-white bg-blue-600 hover:bg-blue-700 shadow-lg rounded-full p-4 transition transform hover:scale-110"
//               >
//                 <FaFacebookF size={24} />
//               </a>

//               {/* LinkedIn */}
//               <a
//                 href="https://linkedin.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label="LinkedIn"
//                 className="text-white bg-blue-800 hover:bg-blue-900 shadow-lg rounded-full p-4 transition transform hover:scale-110"
//               >
//                 <FaLinkedinIn size={24} />
//               </a>

//               {/* Instagram */}
//               <a
//                 href="https://instagram.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label="Instagram"
//                 className="text-white bg-pink-500 hover:bg-pink-600 shadow-lg rounded-full p-4 transition transform hover:scale-110"
//               >
//                 <FaInstagram size={24} />
//               </a>

//               {/* WhatsApp */}
//               <a
//                 href="https://wa.me/1234567890"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label="WhatsApp"
//                 className="text-white bg-green-500 hover:bg-green-600 shadow-lg rounded-full p-4 transition transform hover:scale-110"
//               >
//                 <FaWhatsapp size={24} />
//               </a>
//             </div>
//           </div>
//         </div>
//         {/* Contact Form */}
//         <form
//           onSubmit={handleSubmit}
//           className="bg-white p-8 rounded-lg shadow-lg"
//           noValidate
//         >
//           {successMsg && (
//             <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
//               {successMsg}
//             </div>
//           )}

//           <div className="mb-5">
//             <label
//               htmlFor="name"
//               className="block text-navyblue font-semibold mb-1"
//             >
//               Name <span className="text-red-600">*</span>
//             </label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 ${
//                 errors.name
//                   ? "border-red-500 focus:ring-red-400"
//                   : "border-gray-300 focus:ring-sky-500"
//               }`}
//               placeholder="Your Name"
//             />
//             {errors.name && (
//               <p className="text-red-600 text-sm mt-1">{errors.name}</p>
//             )}
//           </div>

//           <div className="mb-5">
//             <label
//               htmlFor="email"
//               className="block text-navyblue font-semibold mb-1"
//             >
//               Email <span className="text-red-600">*</span>
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 ${
//                 errors.email
//                   ? "border-red-500 focus:ring-red-400"
//                   : "border-gray-300 focus:ring-sky-500"
//               }`}
//               placeholder="Your Email"
//             />
//             {errors.email && (
//               <p className="text-red-600 text-sm mt-1">{errors.email}</p>
//             )}
//           </div>

//           <div className="mb-5">
//             <label
//               htmlFor="subject"
//               className="block text-navyblue font-semibold mb-1"
//             >
//               Subject <span className="text-red-600">*</span>
//             </label>
//             <input
//               type="text"
//               id="subject"
//               name="subject"
//               value={formData.subject}
//               onChange={handleChange}
//               className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 ${
//                 errors.subject
//                   ? "border-red-500 focus:ring-red-400"
//                   : "border-gray-300 focus:ring-sky-500"
//               }`}
//               placeholder="Subject"
//             />
//             {errors.subject && (
//               <p className="text-red-600 text-sm mt-1">{errors.subject}</p>
//             )}
//           </div>

//           <div className="mb-6">
//             <label
//               htmlFor="message"
//               className="block text-navyblue font-semibold mb-1"
//             >
//               Message <span className="text-red-600">*</span>
//             </label>
//             <textarea
//               id="message"
//               name="message"
//               rows="5"
//               value={formData.message}
//               onChange={handleChange}
//               className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 ${
//                 errors.message
//                   ? "border-red-500 focus:ring-red-400"
//                   : "border-gray-300 focus:ring-sky-500"
//               }`}
//               placeholder="Write your message here..."
//             ></textarea>
//             {errors.message && (
//               <p className="text-red-600 text-sm mt-1">{errors.message}</p>
//             )}
//           </div>

//           <button
//             type="submit"
//             className="bg-sky-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-sky-600 transition w-full"
//           >
//             Send Message
//           </button>
//         </form>
//       </div>
//       <div className="max-w-6xl mx-auto mt-12 rounded-lg overflow-hidden shadow-lg border-4 border-navyblue">
//         <iframe
//           src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d531.1542817407612!2d67.86177020029224!3d26.418123939513812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1748887811173!5m2!1sen!2s"
//           width="100%"
//           height="400"
//           allowFullScreen=""
//           loading="lazy"
//           className="border-0"
//           title="School Location"
//         ></iframe>
//       </div>
//     </div>
//   );
// }
