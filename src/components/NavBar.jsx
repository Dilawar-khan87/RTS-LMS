// 'use client';

// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { useState } from 'react';
// import { Menu, X } from 'lucide-react';

// const navLinks = [
//   { name: 'Home', path: '/' },
//   { name: 'About', path: '/About' },
//   { name: 'Gallery', path: '/Gallery' },
//   { name: 'Contact', path: '/Contact' },
// ];

// export default function NavBar() {
//   const pathname = usePathname();
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   return (
//     <nav className="bg-gradient-to-r from-sky-400 via-blue-600 to-blue-900 text-white shadow-md sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
//         <Link href="/" className="text-3xl font-bold tracking-wide hover:scale-105 transition-all duration-300">
//           Roshan Tara School
//         </Link>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex space-x-4 text-lg">
//           {navLinks.map((link) => (
//             <Link
//               key={link.name}
//               href={link.path}
//               className={`px-3 py-1 rounded-lg transition-all duration-300 ${
//                 pathname === link.path
//                   ? 'bg-white text-blue-900 font-bold'
//                   : 'hover:bg-white/20 hover:scale-105'
//               }`}
//             >
//               {link.name}
//             </Link>
//           ))}
//         </div>

//         {/* Mobile Menu Button */}
//         <button
//           onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//           className="md:hidden text-white focus:outline-none"
//         >
//           {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {mobileMenuOpen && (
//         <div className="md:hidden bg-gradient-to-b from-blue-700 via-blue-800 to-blue-900 px-4 pb-4 space-y-2">
//           {navLinks.map((link) => (
//             <Link
//               key={link.name}
//               href={link.path}
//               onClick={() => setMobileMenuOpen(false)}
//               className={`block py-2 px-3 rounded-md transition-all duration-300 ${
//                 pathname === link.path
//                   ? 'bg-white text-blue-900 font-semibold'
//                   : 'hover:bg-white/20 hover:scale-105'
//               }`}
//             >
//               {link.name}
//             </Link>
//           ))}
//         </div>
//       )}
//     </nav>
//   );
// }

// components/Navbar.jsx
// -------------------------------
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/About" },
    { label: "Gallery", path: "/Gallery" },
    { label: "Contact", path: "/Contact" },
  ];

  return (
    <nav className="bg-sky-100 shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          Roshan Tara School
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-10 text-blue-700 font-semibold">
          {navItems.map(({ label, path }) => (
            <li key={label}>
              <Link
                href={path}
                className={`relative px-2 py-1 transition-colors duration-300
                  ${
                    pathname === path
                      ? "text-blue-900 after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-blue-600 after:rounded"
                      : "hover:text-blue-900"
                  }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-blue-700 hover:text-blue-900 focus:outline-none"
          aria-label="Toggle Menu"
        >
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden bg-sky-50 text-blue-700 font-semibold space-y-4 px-6 pb-6 shadow-md">
          {navItems.map(({ label, path }) => (
            <li key={label}>
              <Link
                href={path}
                className={`block py-2 border-b border-sky-200
                  ${
                    pathname === path
                      ? "text-blue-900 font-bold"
                      : "hover:text-blue-900"
                  }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
