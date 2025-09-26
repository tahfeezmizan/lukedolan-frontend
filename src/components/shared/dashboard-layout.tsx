"use client";

import {
  adminItems,
  applicantItems,
  recruiterItems,
  SidebarItems,
} from "@/lib/sidebar-nav-config";
import { useGetMeQuery } from "@/redux/features/userApi";
import { TopNavbar } from "../recruiter/top-navbar";
import { DashboardSidebar } from "./dashboard-sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { data } = useGetMeQuery(undefined);
  console.log("getMe data:", data);

  const role = data?.role;

  let sidebarItems: SidebarItems;

  switch (role) {
    case "admin":
      sidebarItems = adminItems;
      break;
    case "recruiter":
      sidebarItems = recruiterItems;
      break;
    case "profile":
      sidebarItems = applicantItems;
      break;
    default:
      sidebarItems = [];
  }

  return (
    <div className="h-screen overflow-x-auto grid grid-cols-6 gap-0 bg-[#F5F6FA]">
      <div className="col-span-1">
        <DashboardSidebar sidebarItems={sidebarItems} />
      </div>

      {/* Main Content Area */}
      <main className="col-span-5 overflow-y-auto">
        <TopNavbar />
        <div className="p-8 bg-[#EBF1FA] h-full">{children}</div>
      </main>
    </div>
  );
}
