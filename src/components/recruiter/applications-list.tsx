"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDate } from "@/lib/format-date";
import { useGetApplicationQuery } from "@/redux/features/application";
import Link from "next/link";

const jobPosts = [
  {
    id: 1,
    fullName: "Alice Johnson",
    email: "alice.johnson@example.com",
    phone: "+1-202-555-0147",
    applicationDate: "2025-09-10",
    Skills: ["React", "Next.js", "Tailwind CSS"],
    Action: "/applications/1",
  },
  {
    id: 2,
    fullName: "Michael Smith",
    email: "michael.smith@example.com",
    phone: "+1-202-555-0179",
    applicationDate: "2025-09-11",
    Skills: ["Node.js", "Express", "MongoDB"],
    Action: "/applications/2",
  },
  {
    id: 3,
    fullName: "Sophia Lee",
    email: "sophia.lee@example.com",
    phone: "+44-7911-123456",
    applicationDate: "2025-09-12",
    Skills: ["UI/UX Design", "Figma", "Adobe XD"],
    Action: "/applications/3",
  },
  {
    id: 4,
    fullName: "David Brown",
    email: "david.brown@example.com",
    phone: "+61-412-345-678",
    applicationDate: "2025-09-13",
    Skills: ["Python", "Django", "REST APIs"],
    Action: "/applications/4",
  },
  {
    id: 5,
    fullName: "Emma Garcia",
    email: "emma.garcia@example.com",
    phone: "+34-612-789-456",
    applicationDate: "2025-09-14",
    Skills: ["Project Management", "Agile", "Scrum"],
    Action: "/applications/5",
  },
];

export function ApplicationsList() {
  const { data: appliedUser } = useGetApplicationQuery("");
  console.log("people apply ", appliedUser);

  return (
    <div className="">
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900">Applications</h2>

        <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Full Name
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Email
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Phone
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Application Date
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {appliedUser?.map((job: any) => (
                <tr
                  key={job?.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="py-4 px-6">
                    <div className="font-medium text-gray-900">{job?.name}</div>
                  </td>
                  <td className="py-4 px-6 text-gray-700">{job?.email}</td>
                  <td className="py-4 px-6 text-gray-700">{job?.phone}</td>
                  <td className="py-4 px-6 text-gray-700">
                    {formatDate(job?.createdAt)}
                  </td>

                  <td className="py-4 px-6">
                    <Link href={`/recruiter/applications`} target="_blank">
                      <Button className="bg-green-50 text-green-900 hover:bg-green-900 hover:text-white duration-300 font-semibold">
                        View Details
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
