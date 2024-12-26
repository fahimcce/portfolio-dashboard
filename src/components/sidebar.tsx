"use client";

import { usePathname } from "next/navigation";

const links = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Projects", href: "/dashboard/projects" },
  { name: "Skills", href: "/dashboard/skills" },
  { name: "Experience", href: "/dashboard/experience" },
  { name: "Blogs", href: "/dashboard/blogs" },
];

export default function Sidebar() {
  const pathname = usePathname(); // Get the current path

  return (
    <div className="w-64 bg-white shadow-md">
      <div className="p-4 text-xl font-bold text-gray-800">My Portfolio</div>
      <nav>
        <ul>
          {links.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className={`block px-4 py-2 text-gray-700 hover:bg-gray-200 ${
                  pathname === link.href ? "bg-gray-200 font-semibold" : ""
                }`}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
