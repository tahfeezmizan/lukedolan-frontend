"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetAllJobsQuery } from "@/redux/features/jobsApi";
import { PostJobFormData } from "@/types/types";
import { MoreVertical } from "lucide-react";
import TableLoader from "../shared/table-loader";
import Link from "next/link";
import { useState } from "react";

const tableHeaders = [
  { key: "jobTitle", label: "Job Title" },
  { key: "location", label: "Location" },
  { key: "salary", label: "Salary" },
  { key: "posted", label: "Posted" },
  { key: "expires", label: "Expires" },
  { key: "applicantCount", label: "Applicant Count" },
  { key: "action", label: "Action" },
];

export function JobPostTable() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, isLoading, error } = useGetAllJobsQuery({
    page,
    limit,
  });

  return (
    <div className="rounded-lg overflow-hidden">
      <div className="bg-white overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              {tableHeaders.map((header) => (
                <th
                  key={header.key}
                  className="text-left py-4 px-6 font-semibold text-gray-700"
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <TableLoader />
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={7} className="py-8 px-6 text-center text-red-600">
                  Error loading jobs. Please try again.
                </td>
              </tr>
            ) : data && data.length > 0 ? (
              // Show data when available
              data?.map((job: PostJobFormData) => (
                <tr
                  key={job._id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="py-4 px-6">
                    <div className="font-medium text-gray-900">{job.title}</div>
                  </td>
                  <td className="py-4 px-6 text-gray-700">{job.jobLocation}</td>
                  <td className="py-4 px-6 text-gray-700">
                    {job.minSalary} - {job.maxSalary}{" "}
                  </td>
                  <td className="py-4 px-6 text-gray-700">
                    {new Date(job.startDate).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6 text-gray-700">
                    {new Date(job.endDate).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6 text-gray-700">
                    {job.applicationsCount}
                  </td>
                  <td className="py-4 px-6">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Link href={"/"}>View Details</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/recruiter/jobs/${job._id}`}>
                            Edit Job
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))
            ) : (
              // Show empty state when no data is available
              <tr>
                <td colSpan={7} className="py-8 px-6 text-center text-gray-500">
                  No jobs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
