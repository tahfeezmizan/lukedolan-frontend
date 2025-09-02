"use client";

import { Rocket, User, Briefcase, FileText } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const sidebarItems = [
  {
    icon: User,
    label: "Overview",
    href: "/recruiter/overview",
  },
  {
    icon: Briefcase,
    label: "Jobs",
    href: "/recruiter/job-post",
  },
  {
    icon: FileText,
    label: "Applications",
    href: "/recruiter/applications",
  },
];

export function RecruiterSidebar() {
  const pathname = usePathname();

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-slate-800 text-white z-40">
      {/* Logo */}
      <div className="flex items-center gap-3 p-6 border-b border-slate-700">
        <Rocket className="w-8 h-8 text-white" />
        <span className="text-2xl font-bold">Roqit</span>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group",
                isActive
                  ? "bg-emerald-600 text-white"
                  : "text-gray-300 hover:bg-slate-700 hover:text-white"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
