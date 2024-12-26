"use client";
import { FC, ReactNode } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: FC<AdminLayoutProps> = ({ children }) => {
  const pathname = usePathname();

  const showSidebar = pathname.startsWith("/dashboard");

  return (
    <div className="flex h-screen bg-gray-100">
      {showSidebar && <Sidebar />}
      <div className="flex flex-col flex-1">
        <Header />
        <div className="flex-1 p-4 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
