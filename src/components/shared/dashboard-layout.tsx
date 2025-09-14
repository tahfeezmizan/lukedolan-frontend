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
    <div className="min-h-screen bg-[#F5F6FA]">
      <DashboardSidebar sidebarItems={sidebarItems} />
      <TopNavbar title={dashboardTitle} />

      {/* Main Content Area */}
      <main className="pt-16">
        <div className="p-6 bg-[#EBF1FA]">{children}</div>
      </main>
    </div>
  );
}
