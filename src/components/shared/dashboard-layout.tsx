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
  
  const role = data?.role;
  
  console.log("getMe data:", data?.role);


  let sidebarItems: SidebarItems;

  switch (role) {
    case "admin":
      sidebarItems = adminItems;
      break;
    case "recruiter":
      sidebarItems = recruiterItems;
      break;
    case "applicant":
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
<<<<<<< HEAD
        <TopNavbar title={dashboardTitle} />
        <div className="p-4  ">{children}</div>
=======
        <TopNavbar />
        <div className="p-8 bg-[#EBF1FA] h-full">{children}</div>
>>>>>>> a977ab7f934010157b70e37d035ac6cd49e6ae6b
      </main>
    </div>
  );
}
