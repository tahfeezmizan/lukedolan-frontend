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
import { SidebarInset, SidebarProvider } from "../ui/sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { data } = useGetMeQuery(undefined);

  const role = data?.role;

  // console.log("getMe data:", data);

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
    // <div className="h-screen overflow-x-auto grid grid-rows-0 grid-cols-1 lg:grid-cols-6 gap-0 bg-[#F5F6FA]">
    //   <div className="lg:col-span-1 ">
    //     <DashboardSidebar sidebarItems={sidebarItems} />
    //   </div>

    //   {/* Main Content Area */}
    //   <main className="col-span-6 lg:col-span-5">
    //     <TopNavbar />
    //     <div className="p-2 lg:p-8 bg-[#EBF1FA]">{children}</div>
    //   </main>
    // </div>

    <SidebarProvider>
      {/* Sidebar */}
      <DashboardSidebar sidebarItems={sidebarItems} />

      {/* Main Content Area */}
      {/* <SidebarInset className="bg-[#F5F6FA] "> */}
      <SidebarInset className="bg-[#EBF1FA]">
        <TopNavbar />
        {/* <div className="p-2 lg:p-8 bg-[#EBF1FA]">{children}</div> */}
        <div className="p-2 lg:p-8">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
