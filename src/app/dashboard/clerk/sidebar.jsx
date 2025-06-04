"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaMoneyBill,
  FaFileInvoice,
  FaSignOutAlt,
  FaUser
} from "react-icons/fa";

const links = [
  { label: "Dashboard", icon: <FaHome />, href: "/dashboard/clerk" },
  { label: "Fees", icon: <FaMoneyBill />, href: "/dashboard/clerk/fees" },
  {
    label: "Expenses",
    icon: <FaFileInvoice />,
    href: "/dashboard/clerk/records",
  },
  {
    label: "Students",
    icon: <FaUser />,
    href: "/dashboard/clerk/students",
  },
  {
    label: "Teachers",
    icon: <FaUser />,
    href: "/dashboard/clerk/teachers",
  }
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen fixed top-0 left-0 bg-blue-900 text-white shadow-lg">
      <div className="p-6 text-2xl font-bold border-b border-blue-700">
        💼 Clerk Panel
      </div>
      <nav className="mt-6 flex flex-col gap-2 px-4">
        {links.map(({ label, href, icon }) => (
          <Link key={href} href={href}>
            <div
              className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition ${
                pathname === href
                  ? "bg-blue-700 font-semibold"
                  : "hover:bg-blue-700"
              }`}
            >
              {icon}
              {label}
            </div>
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-6 w-full px-4">
        <button className="flex items-center justify-center gap-3 w-full py-2 bg-red-600 rounded hover:bg-red-700 transition">
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </aside>
  );
}
