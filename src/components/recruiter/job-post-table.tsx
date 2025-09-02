"use client";

import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const jobPosts = [
  {
    id: 1,
    title: "Senior Hair Stylist",
    location: "London",
    salary: "£2,200/mo",
    posted: "07/07/2025",
    expires: "07/07/2025",
    applicant: "07/07/2025",
    status: "Pending",
  },
  {
    id: 2,
    jobId: "#J-10294",
    title: "Senior Hair Stylist",
    location: "07/07/2025",
    salary: "07/07/2025",
    posted: "07/07/2025",
    expires: "07/07/2025",
    applicant: "07/07/2025",
    status: "Rejected",
  },
  {
    id: 3,
    jobId: "#J-10294",
    title: "Senior Hair Stylist",
    location: "07/07/2025",
    salary: "07/07/2025",
    posted: "07/07/2025",
    expires: "07/07/2025",
    applicant: "07/07/2025",
    status: "Approved",
  },
  {
    id: 4,
    jobId: "#J-10294",
    title: "Senior Hair Stylist",
    location: "07/07/2025",
    salary: "07/07/2025",
    posted: "07/07/2025",
    expires: "07/07/2025",
    applicant: "07/07/2025",
    status: "Approved",
  },
  {
    id: 5,
    jobId: "#J-10294",
    title: "Senior Hair Stylist",
    location: "07/07/2025",
    salary: "07/07/2025",
    posted: "07/07/2025",
    expires: "07/07/2025",
    applicant: "07/07/2025",
    status: "Rejected",
  },
  {
    id: 6,
    jobId: "#J-10294",
    title: "Senior Hair Stylist",
    location: "07/07/2025",
    salary: "07/07/2025",
    posted: "07/07/2025",
    expires: "07/07/2025",
    applicant: "07/07/2025",
    status: "Approved",
  },
  {
    id: 7,
    jobId: "#J-10294",
    title: "Senior Hair Stylist",
    location: "07/07/2025",
    salary: "07/07/2025",
    posted: "07/07/2025",
    expires: "07/07/2025",
    applicant: "07/07/2025",
    status: "Rejected",
  },
];

export function JobPostTable() {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left py-4 px-6 font-semibold text-gray-700">
                Job Title
              </th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">
                Location
              </th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">
                Salary
              </th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">
                Posted
              </th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">
                Expires
              </th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">
                Applicant
              </th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {jobPosts.map((job) => (
              <tr
                key={job.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="py-4 px-6">
                  <div>
                    {job.jobId && (
                      <div className="text-sm text-gray-500 mb-1">
                        {job.jobId}
                      </div>
                    )}
                    <div className="font-medium text-gray-900">{job.title}</div>
                  </div>
                </td>
                <td className="py-4 px-6 text-gray-700">{job.location}</td>
                <td className="py-4 px-6 text-gray-700">{job.salary}</td>
                <td className="py-4 px-6 text-gray-700">{job.posted}</td>
                <td className="py-4 px-6 text-gray-700">{job.expires}</td>
                <td className="py-4 px-6 text-gray-700">{job.applicant}</td>

                <td className="py-4 px-6">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Job</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
