"use client";

import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function TopNavbar() {
  return (
    <div className="fixed top-0 left-64 right-0 h-16 bg-white border-b border-gray-200 z-30">
      <div className="flex items-center justify-between h-full px-6">
        {/* Page Title */}
        <h1 className="text-2xl font-bold text-gray-900">Recruiter Panel</h1>

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-3 hover:bg-gray-50 px-3 py-2 h-auto"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
                  alt="John Doe"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-semibold text-gray-900">John Doe</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>
              <span>Profile Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Account</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Billing</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              <span>Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
