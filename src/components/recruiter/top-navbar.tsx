"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

const user = {
  panel: "recruiter",
  name: "John Doe",
  avatar:
    "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
};  


export function TopNavbar() {
  return (
    <div className="fixed top-0 left-64 right-0 h-16 bg-white border-b border-gray-200 z-30">
      <div className="flex items-center justify-between h-full px-6">
        {/* Page Title */}
        <h1 className="text-2xl font-bold text-gray-900">Recruiter Panel</h1>

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <Button
            variant="ghost"
            className="flex items-center gap-3 hover:bg-gray-50 px-3 py-2 h-auto"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <Image
                width={10}
                height={10}
                src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
                alt="John Doe"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-semibold text-gray-900">John Doe</span>
          
          </Button>
        </DropdownMenu>
      </div>
    </div>
  );
}
