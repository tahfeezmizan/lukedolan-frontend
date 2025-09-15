"use client";

import {
  adminItems,
  recruiterItems,
  applicantItems,
  SidebarItems,
} from "@/lib/sidebar-nav-config";
import { usePathname } from "next/navigation";
import { TopNavbar } from "../recruiter/top-navbar";
import { DashboardSidebar } from "./dashboard-sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();

  const role = pathname.split("/")[1];

  // Decide which sidebar to show
  let sidebarItems: SidebarItems;
  let dashboardTitle = "";

  switch (role) {
    case "admin":
      sidebarItems = adminItems;
      dashboardTitle = "Admin";
      break;
    case "recruiter":
      sidebarItems = recruiterItems;
      dashboardTitle = "Recruiter";
      break;
    case "profile":
      sidebarItems = applicantItems;
      dashboardTitle = "Applicant";
      break;
    default:
      sidebarItems = [];
      dashboardTitle = "Dashboard";
  }

  return (
    <div className="min-h-screen grid grid-cols-6 bg-[#F5F6FA]">
      <div className="col-span-1">
        <DashboardSidebar sidebarItems={sidebarItems} />
      </div>

      {/* Main Content Area */}
      <main className="col-span-5">
        <TopNavbar title={dashboardTitle} />
        <div className="p-6 bg-[#EBF1FA]">{children}</div>
      </main>
    </div>
  );
}
