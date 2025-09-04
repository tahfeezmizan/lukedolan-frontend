"use client";

import { usePathname } from "next/navigation";
import { recruiterItems, adminItems } from "@/lib/sidebar-config";
import { RecruiterSidebar } from "../recruiter/recruiter-sidebar";
import { TopNavbar } from "../recruiter/top-navbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();

  // Decide which sidebar to show
  const isAdmin = pathname.startsWith("/admin");
  const sidebarItems = isAdmin ? adminItems : recruiterItems;

  return (
    <div className="min-h-screen bg-[#F5F6FA]">
      <RecruiterSidebar sidebarItems={sidebarItems} />
      <TopNavbar />

      {/* Main Content Area */}
      <main className="ml-64 pt-16">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
