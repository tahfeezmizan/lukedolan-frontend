"use client";

import { ApplicationsList } from "@/components/recruiter/applications-list";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export default function ApplicationsPage() {
  const handleJobTypeChange = (value: string) => {
    console.log("Selected Job Type:", value);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Applications</h2>

        {/* Dropdown Menu for Job Types */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Job Types</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={() => handleJobTypeChange("Full-time")}>
              Senior Hair Stylist
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => handleJobTypeChange("Part-time")}>
              Hair Stylist
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <ApplicationsList />
    </div>
  );
}
