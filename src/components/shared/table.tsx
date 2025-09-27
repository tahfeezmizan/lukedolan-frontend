"use client";

import { Button } from "@/components/ui/button";
import { AppliedJob } from "@/types/types";

export default function Table({ appliedJobs }: { appliedJobs: AppliedJob[] }) {
  return (
    <tbody>
      {appliedJobs.map((jobs) => (
        <tr
          key={jobs.id}
          className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
        >
          <td className="py-4 px-6">
            <div>
              <div className="font-medium text-gray-900">{jobs.title}</div>
            </div>
          </td>
          <td className="py-4 px-6 text-gray-700">{jobs?.author?.companyName}</td>
          <td className="py-4 px-6 text-gray-700">{jobs.location}</td>
          <td className="py-4 px-6 text-gray-700">{jobs.createdAt.toString()}</td>
        

          <td className="py-4 px-6">
            <Button className="bg-green-50 text-green-900 hover:bg-green-900 hover:text-white duration-300 font-semibold">
              View Details
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
