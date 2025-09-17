"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";

const usersData = [
  {
    userId: "#J-10294",
    Name: "John Carter",
    Email: "john.carter01@example.com",
    Role: "Job Seeker",
    Phone: "+1-202-555-0143",
    jobsApplied: 55,
  },
  {
    userId: "#J-10295",
    Name: "John Carter",
    Email: "john.carter02@example.com",
    Role: "Recruiter",
    Phone: "+1-202-555-0198",
    jobsApplied: 55,
  },
  {
    userId: "#J-10296",
    Name: "John Carter",
    Email: "john.carter03@example.com",
    Role: "Recruiter",
    Phone: "+1-202-555-0175",
    jobsApplied: 44,
  },
  {
    userId: "#J-10297",
    Name: "John Carter",
    Email: "john.carter04@example.com",
    Role: "Recruiter",
    Phone: "+1-202-555-0122",
    jobsApplied: 12,
  },
  {
    userId: "#J-10298",
    Name: "John Carter",
    Email: "john.carter05@example.com",
    Role: "Recruiter",
    Phone: "+1-202-555-0188",
    jobsApplied: 3,
  },
  {
    userId: "#J-10299",
    Name: "John Carter",
    Email: "john.carter06@example.com",
    Role: "Job Seeker",
    Phone: "+1-202-555-0164",
    jobsApplied: 3,
  },
  {
    userId: "#J-10300",
    Name: "John Carter",
    Email: "john.carter07@example.com",
    Role: "Job Seeker",
    Phone: "+1-202-555-0137",
    jobsApplied: 4,
  },
];

export default function UserTable() {
  return (
    <div className="bg-white rounded-lg overflow-hidden ">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left py-4 px-6 font-semibold text-gray-700">
                User Id
              </th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">
                Name
              </th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">
                Email
              </th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">
                Role
              </th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">
                Phone
              </th>

              <th className="text-left py-4 px-6 font-semibold text-gray-700">
                Jobs Applied
              </th>
            </tr>
          </thead>
          <tbody>
            {usersData.map((user) => (
              <tr
                key={user.userId}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="py-4 px-6 text-gray-700">{user.userId}</td>
                <td className="py-4 px-6 text-gray-700">{user.Name}</td>
                <td className="py-4 px-6 text-gray-700">{user.Email}</td>
                <td className="py-4 px-6 text-gray-700">{user.Role}</td>
                <td className="py-4 px-6 text-gray-700">{user.Phone}</td>
                <td className="py-4 px-6 text-gray-700">{user.jobsApplied}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
