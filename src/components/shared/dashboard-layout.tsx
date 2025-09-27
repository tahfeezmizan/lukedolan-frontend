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
    <div className="h-screen overflow-x-auto grid grid-cols-6 gap-0 bg-[#F5F6FA]">
      <div className="col-span-1">
        <DashboardSidebar sidebarItems={sidebarItems} />
      </div>

      {/* Main Content Area */}
      <main className="col-span-5 overflow-y-auto">
        <TopNavbar title={dashboardTitle} />
        <div className="p-4  ">{children}</div>
      </main>
    </div>
  );
}
