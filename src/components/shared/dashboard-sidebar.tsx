"use client";

import logo from "@/assets/white-logo.png";
import { SidebarItem } from "@/lib/sidebar-nav-config";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function DashboardSidebar({
  sidebarItems,
}: {
  sidebarItems: SidebarItem[];
}) {
  const pathname = usePathname();

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-slate-800 text-white z-40 flex flex-col justify-between pb-20">
      {/* Logo */}
      <div className="">
        <div className="flex items-center gap-3 p-6 border-b border-slate-700">
          <Link href={"/"}>
            <Image
              src={logo}
              alt="Logo"
              width={165}
              height={40}
              className="w-40 h-11"
            />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="py-4 space-y-2 ">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3   transition-all duration-200 group",
                  isActive
                    ? "bg-emerald-600 border-l-4 text-white"
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
      <div className="flex items-center space-x-2 pl-6">
        <LogOut className="h-4 w-4" />
        <span>Logout</span>
      </div>
    </div>
  );
}
