"use client";

import { RecruiterSidebar } from "./recruiter-sidebar";
import { TopNavbar } from "./top-navbar";

interface RecruiterLayoutProps {
  children: React.ReactNode;
}

export function RecruiterLayout({ children }: RecruiterLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F5F6FA]">
      <RecruiterSidebar />
      <TopNavbar />

      {/* Main Content Area */}
      <main className="ml-64 pt-16">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
